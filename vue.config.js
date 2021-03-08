module.exports = {
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            sass: {
                additionalData: '@import "@/assets/styles/styles.scss";'
            }
        }
    }
}