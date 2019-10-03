import { createMapper } from "kvjs";

export const scheme = {
  slots: {
    type: "array",
    key: "s",
    item: {
      type: "object",
      id: [{
        prop: "id",
        type: "int",
      }],
      scheme: {
        summary: {
          type: "string",
          key: "sm",
        },
        creation: {
          type: "int",
          key: "time",
        },
        content: {
          type: "object",
          key: "c",
          scheme: {
            value: {
              type: "string",
              key: "val",
            },
            encrypted: {
              type: "bool",
              key: "encpt",
            },
          },
        },
        archive: {
          type: "bool",
          key: "zip",
        },
        root: {
          type: "bool",
          key: "root",
        },
        resources: {
          type: "array",
          key: "r",
          item: {
            type: "object",
            scheme: {
              url: {
                type: "string",
                key: "url",
              },
              description: {
                type: "string",
                key: "desc",
              },
            },
          },
        },
      },
    },
  },
  links: {
    type: "array",
    key: "l",
    item: {
      type: "object",
      id: [{
        prop: "up",
        type: "int",
      },
      {
        prop: "down",
        type: "int",
      }],
      value: "+",
    },
  },
};

export const mapper = createMapper(scheme);
