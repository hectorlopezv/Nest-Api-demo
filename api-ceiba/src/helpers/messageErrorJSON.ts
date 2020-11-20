export const successResponseMessage: any = {
  respuesta1: (_value) => {
    return { respuesta: 'gracias por pagar todo tu arriendo' };
  },
  respuesta2: (value) => {
    return {
      respuesta: `gracias por tu abono, sin embargo recuerda que te hace falta pagar ${value}`,
    };
  },
};
