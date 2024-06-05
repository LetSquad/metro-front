import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack, { Configuration } from "webpack";
import WebpackBundleAnalyzer from "webpack-bundle-analyzer";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

export const PATHS = {
    src: path.join(__dirname, "./src"),
    public: path.join(__dirname, "./public"),
    appHtml: path.join(__dirname, "./public/index.html"),
    dist: path.join(__dirname, "./dist"),
    global: path.resolve(__dirname, "./src/styles/globals.scss"),
    semantic: path.resolve(__dirname, "./src/styles/semantic.min.css"),
    assets: "assets/",
    nodeModules: path.resolve(__dirname, "./node_modules")
};

const isProduction = process.env.NODE_ENV === "production";
const withAnalyzer = process.env.WITH_ANALYZER;
const mode = isProduction ? "production" : "development";

module.exports = () => {
    const commonPlugins = [
        new HtmlWebpackPlugin({
            template: `${PATHS.public}/index.html`,
            filename: "./index.html",
            title: "Метро Москвы",
            favicon: `${PATHS.public}/favicon.ico`
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: []
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${PATHS.public}/manifest.json`,
                    to: ""
                },
                {
                    from: `${PATHS.public}/robots.txt`,
                    to: ""
                }
            ]
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(mode),
            "process.env.DEBUG": JSON.stringify(process.env.DEBUG),
            "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL),
            "process.env.EXTERNAL_URL": JSON.stringify(process.env.EXTERNAL_URL),
            "process.env.WITH_MOCK": JSON.stringify(process.env.WITH_MOCK)
        })
    ];

    const devPlugins = [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ];

    const prodPlugins = [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        new CompressionPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ];

    const plugins = [
        ...commonPlugins,
        ...(isProduction ? prodPlugins : devPlugins),
        ...(withAnalyzer ? [new WebpackBundleAnalyzer.BundleAnalyzerPlugin()] : [])
    ];

    const devOptions: DevServerConfiguration = {
        static: {
            directory: PATHS.dist
        },
        port: 8888,
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        },
        open: true,
        hot: true,
        historyApiFallback: true,
        server: "https"
    };

    const config: Configuration = {
        mode,
        target: "web",
        devtool: isProduction ? "cheap-source-map" : "eval-cheap-module-source-map",
        context: __dirname,
        entry: {
            app: PATHS.src
        },
        experiments: {
            topLevelAwait: true
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", "json", ".css", ".scss", ".svg", ".ignore"],
            alias: {
                "@coreStyles": path.resolve(__dirname, "src/styles"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@models": path.resolve(__dirname, "src/models"),
                "@api": path.resolve(__dirname, "src/api"),
                "@static": path.resolve(__dirname, "src/static"),
                "@store": path.resolve(__dirname, "src/store"),
                "@coreUtils": path.resolve(__dirname, "src/utils"),
                "@components": path.resolve(__dirname, "src/components"),
                "@parts": path.resolve(__dirname, "src/components/parts"),
                "@hooks": path.resolve(__dirname, "src/utils/hooks")
            }
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.scss$/,
                            exclude: [PATHS.nodeModules],
                            use: [
                                isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                                {
                                    loader: "css-loader",
                                    options: {
                                        import: true,
                                        sourceMap: !isProduction,
                                        modules: {
                                            namedExport: false,
                                            auto: true,
                                            localIdentName: isProduction ? "[hash:base64]" : "[path][name]__[local]",
                                            exportLocalsConvention: "camelCaseOnly"
                                        }
                                    }
                                },
                                {
                                    loader: "postcss-loader",
                                    options: {
                                        sourceMap: true,
                                        postcssOptions: {
                                            config: path.resolve(__dirname, "postcss.config.js")
                                        }
                                    }
                                },
                                {
                                    loader: "sass-loader",
                                    options: {
                                        sourceMap: !isProduction
                                    }
                                }
                            ]
                        },
                        {
                            test: /\.tsx?$/,
                            exclude: [PATHS.nodeModules],
                            use: [
                                {
                                    loader: "ts-loader",
                                    options: {
                                        compilerOptions: {
                                            module: "ESNext",
                                            removeComments: false
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            test: /\.(ignore|zip|png|ico|jpg|ttf|otf|eot|svg|woff(2)?)(\?[\da-z]+)?$/,
                            type: "asset/resource",
                            generator: {
                                filename: "static/assets/[name]-[contenthash][ext]"
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: "vendors",
                        test: /node_modules\/(?!zxcvbn)(?!react-calendar)(?!react-datepicker)(?!date-fns)/,
                        chunks: "all",
                        enforce: true,
                        maxSize: 249_856
                    }
                }
            },
            runtimeChunk: "single",
            moduleIds: "deterministic",
            minimize: true
        },
        output: {
            path: PATHS.dist,
            filename: `${PATHS.assets}js/[name]-bundle.[fullhash].js`,
            publicPath: "/"
        },
        plugins
    };

    return isProduction ? config : { ...config, devServer: devOptions };
};
