require('@babel/register')({
    'presets': [
        ["latest-node", {"target": "current"}]
    ]
});

require('@babel/polyfill');
require("./server");