import basePartsStyles from "@coreStyles/baseParts.module.scss";

export default function NotFoundErrorScreen() {
    return (
        <div className={basePartsStyles.flexBaseCenterContainer}>
            <h1>404 Not Found</h1>
        </div>
    );
}
