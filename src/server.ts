import 'source-map-support/register';
import './module-alias';

// This needs to be imported before everything else.
// eslint-disable-next-line import/order

import { createApp } from 'src/app';

/**
 * Start an Express server and installs signal handlers on the
 * process for graceful shutdown.
 */
(async () => {
    try {
        const { app } = await createApp();
        app.listen(app.get('port'), () => {
            console.info(
                {
                    port_number: app.get('port'),
                    env_string: app.get('env')
                },
                'Started express server'
            );
        });
    } catch (err) {
        console.error(err as Error, 'error caught in server.ts');
    }
})();
