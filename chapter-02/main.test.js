import { describe, it, expect } from "vitest";

// Import các hàm từ main.js
const calculateTotal = (product) => {
    return product.price * product.quantity;
};

const applyDiscount = (product) => {
    const { price, discountPercent } = product;

    // Xử lý trường hợp discountPercent không hợp lệ
    if (discountPercent < 0) {
        return "Lỗi: Phần trăm giảm giá không được âm";
    }
    if (discountPercent > 100) {
        return "Lỗi: Phần trăm giảm giá không được vượt quá 100%";
    }

    const discountAmount = (price * discountPercent) / 100;
    const finalPrice = price - discountAmount;
    return finalPrice;
};

const calculateShipping = (order) => {
    const { totalPrice, location } = order;

    // Kiểm tra location hợp lệ
    if (location !== "noi-thanh" && location !== "ngoai-thanh") {
        return "Lỗi: Địa chỉ giao hàng không hợp lệ. Vui lòng chọn 'noi-thanh' hoặc 'ngoai-thanh'";
    }

    // Nếu tổng tiền >= 500,000 thì miễn phí vận chuyển
    if (totalPrice >= 500000) {
        return 0;
    }

    // Tính phí vận chuyển theo location
    if (location === "noi-thanh") {
        return 30000;
    } else if (location === "ngoai-thanh") {
        return 50000;
    }
};

// Test suite cho bài 1 - Tính tổng tiền hàng
describe("Bài 1 - Tính tổng tiền hàng", () => {
    it("should calculate total for normal product (100k x 3)", () => {
        const product = {
            price: 100000,
            quantity: 3,
        };
        const result = calculateTotal(product);
        expect(result).toBe(300000);
    });

    it("should calculate total for different product (50k x 5)", () => {
        const product = {
            price: 50000,
            quantity: 5,
        };
        const result = calculateTotal(product);
        expect(result).toBe(250000);
    });

    it("should return 0 when quantity is 0", () => {
        const product = {
            price: 200000,
            quantity: 0,
        };
        const result = calculateTotal(product);
        expect(result).toBe(0);
    });

    it("should return 0 when price is 0", () => {
        const product = {
            price: 0,
            quantity: 10,
        };
        const result = calculateTotal(product);
        expect(result).toBe(0);
    });

    it("should calculate total for large values (1.5M x 2)", () => {
        const product = {
            price: 1500000,
            quantity: 2,
        };
        const result = calculateTotal(product);
        expect(result).toBe(3000000);
    });

    it("should handle decimal prices correctly", () => {
        const product = {
            price: 99999.99,
            quantity: 1,
        };
        const result = calculateTotal(product);
        expect(result).toBe(99999.99);
    });

    it("should handle decimal quantity correctly", () => {
        const product = {
            price: 100000,
            quantity: 2.5,
        };
        const result = calculateTotal(product);
        expect(result).toBe(250000);
    });
});
