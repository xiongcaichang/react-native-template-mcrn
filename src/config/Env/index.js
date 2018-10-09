const salts = {
    prod: [],
    dev: []
}


const env = {
        prod: {
            name: 'release',
            // PARTNER: 'https://mn-steward.yunshanmeicai.com',
            // SUPPLIER: 'https://partner.guagua66.com',
            PARTNER: 'https://mn-steward.stage.yunshanmeicai.com',
            SUPPLIER: 'http://123.56.178.125:8080',
            AMP: 'https://ampapi.yunshanmeicai.com',
            salts: salts.prod,
            ampToken_ios: "xxxxxxxxxxxxxxxxxxxxxxxx",
            ampToken_android: "xxxxxxxxxxxxxxxxxxxxxxxx"

        },
        stage: {
            name: 'stage',
            PARTNER: 'https://mn-steward.stage.yunshanmeicai.com',
            SUPPLIER: 'http://123.56.178.125:8080',
            AMP: 'https://ampapi.yunshanmeicai.com',
            salts: salts.dev,
            ampToken_ios: "xxxxxxxxxxxxxxxxxxxxxxxx",
            ampToken_android: "xxxxxxxxxxxxxxxxxxxxxxxx",
        },
        test1: {
            name: 'stage',
            PARTNER: 'https://mn-steward.test.yunshanmeicai.com',
            SUPPLIER: 'http://123.56.178.125:8080',
            AMP: 'https://ampapi.yunshanmeicai.com',
            salts: salts.dev,
            ampToken_ios: "xxxxxxxxxxxxxxxxxxxxxxxx",
            ampToken_android: "xxxxxxxxxxxxxxxxxxxxxxxx",
        },
        test2: {
            name: 'stage',
            PARTNER: 'https://mn-steward.test2.yunshanmeicai.com',
            SUPPLIER: 'http://123.56.178.125:8080',
            AMP: 'https://ampapi.yunshanmeicai.com',
            salts: salts.dev,
            ampToken_ios: "xxxxxxxxxxxxxxxxxxxxxxxx",
            ampToken_android: "xxxxxxxxxxxxxxxxxxxxxxxx",
        },
        work: {
            name: 'stage',
            PARTNER: 'http://192.168.61.148:8001',
            SUPPLIER: 'http://192.168.61.148:8080',
            AMP: 'https://ampapi.yunshanmeicai.com',
            salts: salts.dev,
            ampToken_ios: "xxxxxxxxxxxxxxxxxxxxxxxx",
            ampToken_android: "xxxxxxxxxxxxxxxxxxxxxxxx",
        },
        dev: {
            name: 'stage',
            PARTNER: 'https://mn-steward.test.yunshanmeicai.com',
            SUPPLIER: 'http://123.56.178.125:8080',
            AMP: 'https://ampapi.yunshanmeicai.com',
            salts: salts.dev,
            ampToken_ios: "xxxxxxxxxxxxxxxxxxxxxxxx",
            ampToken_android: "xxxxxxxxxxxxxxxxxxxxxxxx",
        }
}
export default env;
