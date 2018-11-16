'use strict'

const cluster = require('cluster');
const { as } = require('@cuties/cutie');
const { If, Else } = require('@cuties/if-else');
const { IsMaster, ClusterWithForkedWorkers, ClusterWithExitEvent } = require('@cuties/cluster');
const { ParsedJSON, Value } = require('@cuties/json');
const { Backend, RestApi, CreatedServingFilesMethod, CreatedCachedServingFilesMethod } = require('@cuties/rest');
const { ReadDataByPath, WatcherWithEventTypeAndFilenameListener } = require('@cuties/fs');
const CustomNotFoundMethod = require('./../CustomNotFoundMethod');
const CreatedCustomIndex = require('./../CreatedCustomIndex');
const OnPageStaticJsFilesChangeEvent = require('./../OnPageStaticJsFilesChangeEvent');
const OnStaticGeneratorsChangeEvent = require('./../OnStaticGeneratorsChangeEvent');
const OnTemplatesChangeEvent = require('./../OnTemplatesChangeEvent');
const ReloadedBackendOnFailedWorkerEvent = require('./../ReloadedBackendOnFailedWorkerEvent');
const UrlToFSPathMapper = require('./../UrlToFSPathMapper');
const PrintedToConsolePageLogo = require('./../PrintedToConsolePageLogo');
const notFoundMethod = new CustomNotFoundMethod(new RegExp(/^\/not-found/));
const numCPUs = require('os').cpus().length;
const env = process.env.NODE_ENV || 'local';
const dev_env = env === 'local' || env === 'dev';

const launchedBackend = new Backend(
  new Value(as('config'), `${env}.protocol`),
  new Value(as('config'), `${env}.port`),
  new Value(as('config'), `${env}.host`),
  new RestApi(
    new CreatedCustomIndex(
      new Value(as('config'), 'index'),
      notFoundMethod
    ),
    new CreatedServingFilesMethod(
      new RegExp(/^\/(css|html|image|js|txt)/),
      new UrlToFSPathMapper(
        new Value(as('config'), 'static')
      ), 
      notFoundMethod
    ),
    notFoundMethod
  )
);

new ParsedJSON(
  new ReadDataByPath('./config.json')
).as('config').after(
  new If(
    new IsMaster(cluster),
    new PrintedToConsolePageLogo(
      new ReadDataByPath(
        new Value(as('config'), 'page.logoText')
      ),
      new Value(as('config'), 'page.version'),
      'RUN'
    ).after(
      new If(
        dev_env,
        new WatcherWithEventTypeAndFilenameListener(
          new Value(as('config'), 'staticGenerators'),
          { persistent: true, recursive: true, encoding: 'utf8' },
          new OnStaticGeneratorsChangeEvent(
            new Value(as('config'), 'staticGenerators')
          )
        ).after(
          new WatcherWithEventTypeAndFilenameListener(
            new Value(as('config'), 'templates'),
            { persistent: true, recursive: true, encoding: 'utf8' },
            new OnTemplatesChangeEvent(
              new Value(as('config'), 'staticGenerators')
            )
          ).after(
            new WatcherWithEventTypeAndFilenameListener(
              new Value(as('config'), 'staticJs'),
              { persistent: true, recursive: true, encoding: 'utf8' },
              new OnPageStaticJsFilesChangeEvent(
                new Value(as('config'), 'staticJs'),
                new Value(as('config'),'bundleJs')
              )
            )
          )
        )
      ).after(
        new If(
          new Value(as('config'), `${env}.clusterMode`),
          new ClusterWithForkedWorkers(
            new ClusterWithExitEvent(
              cluster,
              new ReloadedBackendOnFailedWorkerEvent()
            ), numCPUs
          ),
          new Else(
            launchedBackend
          )
        )
      )
    ),
    new Else(
      launchedBackend
    )
  )
).call();
