import * as React from "react";
import { useCallback, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";

import { Button, Icon, Input, Modal } from "semantic-ui-react";

import { useToggle } from "@hooks/useToogle";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";

import ImageWithLoading from "../ImageWithLoading/ImageWithLoading";
import styles from "./styles/ImageSelector.module.scss";

interface ImageSelectorProps {
    image: string | File | undefined;
    saveImage: (image: File) => void;
    closeModal: () => void;
    width?: number;
    height?: number;
    border?: number | number[];
    isBorderRadiusEnable?: boolean;
    borderColor?: number[];
    placeholder: string;
}

export default function ImageSelector({
    closeModal,
    image,
    saveImage,
    width = 200,
    height = 200,
    border,
    borderColor,
    isBorderRadiusEnable = false,
    placeholder
}: ImageSelectorProps) {
    const editorRef = useRef<AvatarEditor>(null);
    const [currentFile, setCurrentFile] = useState<File | string | undefined>(image);
    const [errorFile, setErrorFile] = useState<File>();

    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [borderRadius, setBorderRadius] = useState<number>(0);

    const [isImageLoading, , , setImageLoadingFalse] = useToggle(true);
    const [isImageLoadingFailed, , setIsImageLoadingFailedTrue, setIsImageLoadingFailedFalse] = useToggle();

    const onDrop = useCallback(
        (_acceptedFiles: File[]) => {
            if (_acceptedFiles[0]) {
                setCurrentFile(_acceptedFiles[0]);
                setIsImageLoadingFailedFalse();
                if (errorFile) {
                    setErrorFile(undefined);
                }
            }
        },
        [errorFile, setIsImageLoadingFailedFalse]
    );

    const save = useCallback(
        (file: File) => {
            editorRef.current?.getImage().toBlob(
                (blob) => {
                    saveImage(new File([blob as Blob], file.name, { type: file.type }));
                    closeModal();
                },
                file.type,
                100
            );
        },
        [closeModal, saveImage]
    );

    const { getRootProps, getInputProps, open, fileRejections, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg"]
        },
        multiple: false,
        noClick: true,
        noKeyboard: true
    });

    const content = useCallback(() => {
        if (fileRejections.length > 0) {
            return (
                <div className={styles.dropzoneTitleContainerError}>
                    {`Файл ${fileRejections[0].file.name} не разрешен. Перетащите файл с расширением .jpg, .jpeg, .png или`}
                    <Button onClick={open} className={styles.dropzoneTitleLink} type="button">
                        выберите его
                    </Button>
                </div>
            );
        }

        const computedBorderRadius = isBorderRadiusEnable ? borderRadius : undefined;

        if (currentFile) {
            return (
                <div className={styles.avatarEditorContainer}>
                    <div className={styles.avatarEditorContentContainer}>
                        {typeof image === "string" && (isImageLoading || isImageLoadingFailed) ? (
                            <ImageWithLoading
                                className={styles.errorImage}
                                src={image}
                                onLoad={() => setImageLoadingFalse()}
                                onError={(index: React.InvalidEvent<HTMLImageElement>) => {
                                    index.target.src = placeholder;
                                    setIsImageLoadingFailedTrue();
                                }}
                                circular
                            />
                        ) : (
                            <>
                                <AvatarEditor
                                    className={styles.avatarEditor}
                                    ref={editorRef}
                                    width={width}
                                    height={height}
                                    image={currentFile}
                                    scale={zoom}
                                    rotate={rotation}
                                    onLoadFailure={setIsImageLoadingFailedTrue}
                                    border={border}
                                    borderRadius={computedBorderRadius}
                                    color={borderColor}
                                />
                                <div className={styles.avatarEditorRangeContainer}>
                                    <span className={styles.avatarEditorRangeLabel}>Увеличение</span>
                                    <Input
                                        value={zoom}
                                        type="range"
                                        step={0.01}
                                        min={1}
                                        max={2}
                                        onChange={(_event, data) => {
                                            setZoom(Number.parseFloat(data.value));
                                        }}
                                        className={styles.avatarEditorRange}
                                    />
                                    <span className={styles.avatarEditorRangeLabel}>Вращение</span>
                                    <Input
                                        value={rotation}
                                        type="range"
                                        step={1}
                                        min={0}
                                        max={360}
                                        onChange={(_event, data) => {
                                            setRotation(Number.parseInt(data.value, 10));
                                        }}
                                        className={styles.avatarEditorRange}
                                    />
                                    {isBorderRadiusEnable && (
                                        <>
                                            <span className={styles.avatarEditorRangeLabel}>Закругление краев</span>
                                            <Input
                                                value={borderRadius}
                                                type="range"
                                                step={1}
                                                min={0}
                                                max={50}
                                                onChange={(_event, data) => {
                                                    setBorderRadius(Number.parseInt(data.value, 10));
                                                }}
                                                className={styles.avatarEditorRange}
                                            />
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <div className={styles.avatarEditorActionContainer}>
                        <Button onClick={open} type="button">
                            Выбрать другой файл
                        </Button>
                    </div>
                </div>
            );
        }
        return (
            <>
                <Icon className={styles.iconUpload} name="cloud upload" />
                <div className={styles.dropzoneTitleContainerDefault}>
                    <div>Переместите файл .jpeg, .jpg или .png изображения в область или</div>
                    <Button onClick={open} className={styles.dropzoneTitleLink} type="button">
                        выберите его
                    </Button>
                </div>
            </>
        );
    }, [
        fileRejections,
        currentFile,
        open,
        image,
        isImageLoading,
        isImageLoadingFailed,
        width,
        height,
        zoom,
        rotation,
        border,
        isBorderRadiusEnable,
        borderRadius,
        borderColor,
        setImageLoadingFalse,
        placeholder,
        setIsImageLoadingFailedTrue
    ]);

    let style = styles.dropzoneDefault;
    if (fileRejections.length > 0) {
        style = styles.dropzoneReject;
    } else if (acceptedFiles.length > 0) {
        style = styles.dropzoneAccept;
    }

    return (
        <div>
            <Modal className={styles.modal} open closeOnDimmerClick={false} closeOnEscape={false}>
                <Modal.Content className={styles.modalContent}>
                    <div {...getRootProps({ className: styles.dropzoneContainer })}>
                        <input {...getInputProps()} />
                        <div className={style}>{content()}</div>
                    </div>
                </Modal.Content>
                <Modal.Actions className={styles.modalAction}>
                    <PrimaryButton disabled={!currentFile} onClick={() => save(currentFile as File)} type="button">
                        Сохранить
                    </PrimaryButton>
                    <SecondaryButton onClick={closeModal} type="button">
                        Отмена
                    </SecondaryButton>
                </Modal.Actions>
            </Modal>
        </div>
    );
}
