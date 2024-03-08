export enum Permissions {
    PROJECT_EDIT = 0,
    PROJECT_VIEW = 1,
    PROJECT_REQUESTS = 2,
    PRESALE_CREATE = 3,
    PHASE_EDIT = 4,
    USER_MANAGEMENT = 5,
    CONTENT_MANAGEMENT = 6,
    REPORTS_VIEW = 7,
    CUSTOMER_VIEW = 8, //permission to mock view as customer
    VA_CONDO = 9,
    EMAIL_TEMPLATE_MANAGEMENT = 10,
    PROGRAM_DECISION_TEXT = 11,
    CONDO_FORM = 12,
    HUD = 13,
    FHA = 14,
};

export enum Roles {
    ADMIN = 1,
    STAFF = 2,
    STUDENT = 3,
    MOCK_USER = 4
};

export const eventColorPalette = [
  {id: 1, name: "Navy", value: "#002e5d" },
  {id: 2, name: "Emerald", value: "#2ecc71" },
  {id: 3, name: "Orange", value: "#f39c12" },
  {id: 4, name: "Ruby", value: "#e74c3c" },
  {id: 5, name: "Purple", value: "#9b59b6" },
  {id: 6, name: "Turquoise", value: "#1abc9c" },
  {id: 7, name: "Goldenrod", value: "#d35400" },
  {id: 8, name: "Crimson", value: "#dc143c" },
  {id: 9, name: "Indigo", value: "#4b0082" },
  {id: 10, name: "Teal", value: "#008080" }
];
