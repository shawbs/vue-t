
const requireComponent = require.context(
    './',
    true,
    /.(vue|js)$/,
);

function reg(Vue, component) {
    if (component.noTag) {
        Vue.prototype[`$${component.names}`] = component;
    } else {
        Vue.component(component.name, component);
    }
}

export default {
    install(Vue /*options*/) {
        // console.log(requireComponent.keys())
        requireComponent.keys().forEach(fileName => {
            // 只获取二级目录下的文件
            if (fileName.split('/').length === 3){
                const components = requireComponent(fileName);
                for (const key in components) {
                    if (components.hasOwnProperty(key)) {
                        reg(Vue, components[key]);
                    }
                }
            }
        });
    },
};
