import * as React from "react";

import { Image, Placeholder } from "semantic-ui-react";
import { ImageProps } from "semantic-ui-react/dist/commonjs/elements/Image/Image";

import { useToggle } from "@hooks/useToogle";
import imageNotFound from "@static/images/imageNotFound.png";

import styles from "./styles/ImageWithLoading.module.scss";

export default function ImageWithLoading({ onError, onLoad, ...props }: ImageProps) {
    const [isImageLoading, , , setIsImageLoadingFalse] = useToggle(true);

    return (
        <div className={styles.container}>
            <Image
                {...props}
                styles={isImageLoading ? { display: "none" } : undefined}
                onLoad={() => {
                    setIsImageLoadingFalse();
                    if (onLoad) {
                        onLoad();
                    }
                }}
                onError={(error: React.InvalidEvent<HTMLImageElement>) => {
                    setIsImageLoadingFalse();
                    if (onError) {
                        onError(error);
                    } else {
                        error.target.src = imageNotFound;
                    }
                }}
            />
            {isImageLoading && (
                <Placeholder
                    className={`${props.className} ${styles.placeholder} ${props.circular ? styles.placeholderCircular : ""}`}
                >
                    <Placeholder.Image />
                </Placeholder>
            )}
        </div>
    );
}
