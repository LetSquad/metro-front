declare module "jwt-decode" {
    type JWTAlgorithm =
        | "HS256"
        | "HS384"
        | "HS512"
        | "RS384"
        | "RS512"
        | "ES256"
        | "ES384"
        | "ES512"
        | "PS256"
        | "PS384"
        | "PS512"
        | "none";

    type JWTType = "JWT" | "JWE";

    function jwtDecode<Payload>(
        token: string,
    ): Payload & { exp: number; iat: number };
    function jwtDecode<Payload>(
        token: string,
        options: { header: false },
    ): Payload & { exp: number; iat: number };
    function jwtDecode(
        token: string,
        options: { header: true },
    ): { typ: JWTType; alg: JWTAlgorithm };

    export default jwtDecode;
}
