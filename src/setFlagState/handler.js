'use strict';

let LaunchDarklyUtils = require('launchdarkly-nodeutils').LaunchDarklyUtils;
let swaggerYaml = unescape(require('./swaggerYaml').yaml);

/*process.on('unhandledRejection', reason => {
    console.error(JSON.stringify({ error: reason }));
    process.exit(1);
});*/

console.debug = console.log;

module.exports.handle = (event, context, callback) => {
    let flagProject = process.env.LDL_LAUNCHDARKLY_PROJECT;
    let flagEnv = process.env.LDL_LAUNCHDARKLY_ENV;
    let flagKey = process.env.LDL_LAUNCHDARKLY_FLAGKEY;
    let instanceId = process.env.LDL_EC2_INSTANCE_ID;

    if (event.detail['instance-id'] !== instanceId) {
        callback(null, { message: `${event.detail['instance-id']} does not match expected ${instanceId}` });
        return;
    }

    let newState = true;
    if (event.detail.state !== 'running') {
        newState = false;
    }

    let eventDetail = {
        flagProject: flagProject,
        flagEnv: flagEnv,
        flagKey: flagKey,
        instanceId: instanceId,
        newState: newState,
        event: event
    };

    console.log(JSON.stringify(eventDetail));

    new LaunchDarklyUtils()
        .create(process.env.LDL_LAUNCHDARKLY_API_TOKEN, console, swaggerYaml)
        .then(function(ldUtils) {
            ldUtils.flags.toggleFeatureFlag(flagProject, flagKey, flagEnv, newState).then(flag => {
                callback(null, { message: `flag ${flagKey} set to ${newState}`, flag: flag, eventDetail: eventDetail });
            });
        });
};
