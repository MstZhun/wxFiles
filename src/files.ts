interface WxFiles {
    [index: string]: string;
}

/**
 *
 * @param name file name
 */ export const files = function (name: string): {
    page: WxFiles;
    components: WxFiles;
} {
    const page = {
        js: `
Page({
    behaviors: [],

    data: {},

    onLoad(options) {},

    onShow() {},

    onPageScroll() {},

    onReachBottom() {},

    onShareAppMessage() {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: '自定义转发标题'
                });
            }, 2000);
        });
        return {
            title: '',
            path: '',
            imageUrl: '',
            promise
        };
    }
});
    `,
        wxss: ``,
        scss: ``,
        less: ``,
        json: `
{
    "navigationBarTitleText": "",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "usingComponents": {}
}`,
        wxml: ``
    };
    const components = {
        js: `
Component({
    behaviors: [],
    properties: {
        color: {
            type: String,
            value: ""
        }
    },

    data: {

    },

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached() { },
        moved() { },
        detached() { },
    },

    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show() { },
        hide() { },
        resize() { },
    },

    methods: {

    }
})
`,
        json: `
{
    "component": true,
    "usingComponents": {}
}
`,
        wxss: ``,
        scss: ``,
        less: ``,
        wxml: ``
    };
    return {
        page,
        components
    };
};
