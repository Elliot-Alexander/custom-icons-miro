const fs = require('fs')
const {execSync} = require('child_process')


/**
 * A simple plugin for providing HTTPS to the local development server to allow for HMR (using mkcert in the backend)
 */
export const localCertificatePlugin = () => {
    const certDir = './certs'
    const keyPath = certDir + '/localhost-key.pem';
    const certificatePath = certDir + '/localhost.pem';

    return {
        name: 'local-certificate-plugin',
        apply: 'serve',
        config: () => ({
            server: {
                https: {
                    cert: certificatePath,
                    key: keyPath,
                },
                hmr: {
                    protocol: 'wss',
                },
            },
        }),
        configResolved: () => {
            // Check if mkcert is installed with Brew (will add windows support at some point)
            try {
                execSync('brew list mkcert')
            } catch (e) {
                console.log('\x1b[34m', 'Could not find keg for mkcert, trying to automatically install now!')
                execSync('brew install mkcert -q')
                console.log('\x1b[34m', 'Installed mkcert via Homebrew successfully!')
            }

            // Check if CA is installed in the local trust store
            console.log('\x1b[34m', 'Ensuring CA is installed in the local trust, you may need to enter the root password')
            execSync('mkcert -install')

            // Check if the certs directory exists, if not create it
            try {
                fs.readdirSync(certDir)
            } catch (e) {
                execSync('mkdir ' + certDir)
            }

            //Check if local certs already exist
            try {
                fs.readFileSync(certificatePath) || fs.readFileSync(keyPath)
            }
            catch (e) {
                try {
                    console.log('\x1b[34m', '⚠️ Failed to find local certificates, trying to generate them now!')
                    execSync(`mkcert -cert-file ${certificatePath} -key-file ${keyPath} localhost`)

                    // Check if certs are generated
                    fs.readFileSync(certificatePath) || fs.readFileSync(keyPath)
                } catch (e) {
                    throw new Error(`
Local certificate is missing and automatic creation has failed. Please try do the following:
- Install mkcert, see https://github.com/FiloSottile/mkcert#installation -> 'brew install mkcert'
- Run mkcert -install
- Run mkdir ./certs
- Run npm run generate-certificate
				`);
                }
            }
        },
    };
};
