export const isValidUUID = (uuid: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

export const areAllProductIdsValid = (products: any): boolean => {
    for (const product of products) {
        if (!isValidUUID(product.product_id)) {
            return false;
        }
    }
    return true;
}
