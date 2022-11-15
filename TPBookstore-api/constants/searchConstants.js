const productQueryParams = {
    sort: {
        asc: { priceSale: "asc" },
        desc: { priceSale: "desc" },
        newest: { createdAt: "desc" },
        latest: { createdAt: "asc" },
        total_sales: { totalSales: "desc" },
        default: { createdAt: "desc" }
    },
    status: {
        disabled: { isDisabled: true },
        notDisabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const commentQueryParams = {
    date: {
        newest: { createdAt: "desc" },
        latest: { createdAt: "asc" },
        default: { createdAt: "desc" }
    },
    status: {
        disabled: { isDisabled: true },
        notDisabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const orderQueryParams = {
    date: {
        newest: { createdAt: "desc" },
        latest: { createdAt: "asc" },
        default: { createdAt: "desc" }
    },
    status: {
        disabled: { isDisabled: true },
        notDisabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const userQueryParams = {
    date: {
        newest: { createdAt: "desc" },
        latest: { createdAt: "asc" },
        default: { createdAt: "desc" }
    },
    status: {
        disabled: { isDisabled: true },
        notDisabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const categoryQueryParams = {
    date: {
        newest: { createdAt: "desc" },
        latest: { createdAt: "asc" },
        default: { createdAt: "desc" }
    },
    status: {
        disabled: { isDisabled: true },
        notDisabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const validateConstants = function (reference, constant, constantField) {
    constantField = constantField ? constantField.toString().trim().toLowerCase() : "";
    return reference[constant].hasOwnProperty(constantField)
        ? reference[constant][constantField]
        : reference[constant]["default"];
};

export {
    productQueryParams,
    commentQueryParams,
    orderQueryParams,
    userQueryParams,
    categoryQueryParams,
    validateConstants
};
