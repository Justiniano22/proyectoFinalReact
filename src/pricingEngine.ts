interface PreciosPorTipo {
    "_default_price_": number; // Precio por defecto para esta provincia
    "Casa"?: number;
    "Departamento"?: number;
    "Local Comercial"?: number;
    "Terreno"?: number;
    "Oficina"?: number;
    "Deposito de Logística"?: number;
    "Barrio Privado"?: number;
}

// 2. Precio nacional por defecto (si no encontramos la provincia)
const DEFAULT_NATIONAL_PRICE = 2150;

// 3. Definimos los precios (simulados) para CADA provincia
const pricingData: Record<string, PreciosPorTipo> = {
    
    // --- Precios (Simulados) ---

    "Buenos Aires": {
        "_default_price_": 950,
        "Casa": 1100,
        "Departamento": 1300,
        "Terreno": 250,
        "Barrio Privado": 1000,
        "Deposito de Logística": 500,
        "Oficina": 900,
        "Local Comercial": 1800,
    },
    "Ciudad Autónoma de Buenos Aires": {
        "_default_price_": 2500,
        "Casa": 3600,
        "Departamento": 3000,
        "Oficina": 3200,
        "Local Comercial": 2800,
        "Terreno": 1200, 
        "Barrio Privado": 4500,
        "Deposito de Logística": 2900,
    },
    "Catamarca": {
        "_default_price_": 1520,
        "Casa": 2800,
        "Departamento": 2500,
        "Oficina": 3100,
        "Local Comercial": 2200,
        "Terreno": 1100, 
        "Barrio Privado": 3800,
        "Deposito de Logística": 1900,
    },
    "Chaco": {
        "_default_price_": 2200,
        "Casa": 3100,
        "Departamento": 2900,
        "Oficina": 3300,
        "Local Comercial": 2700,
        "Terreno": 1300, 
        "Barrio Privado": 4200,
        "Deposito de Logística": 2400,
    },
    "Chubut": {
        "_default_price_": 1800,
        "Casa": 2950,
        "Departamento": 2700,
        "Oficina": 3000,
        "Local Comercial": 2400,
        "Terreno": 1150, 
        "Barrio Privado": 3900,
        "Deposito de Logística": 2100,
    },
    "Córdoba": {
        "_default_price_": 2050,
        "Casa": 3300,
        "Departamento": 3000,
        "Oficina": 3500,
        "Local Comercial": 2800,
        "Terreno": 1400, 
        "Barrio Privado": 4300,
        "Deposito de Logística": 2600,
    },
    "Corrientes": {
        "_default_price_": 1650,
        "Casa": 2700,
        "Departamento": 2400,
        "Oficina": 2900,
        "Local Comercial": 2100,
        "Terreno": 1050, 
        "Barrio Privado": 3700,
        "Deposito de Logística": 1800,
    },
    "Entre Ríos": {
        "_default_price_": 2300,
        "Casa": 3450,
        "Departamento": 3100,
        "Oficina": 3600,
        "Local Comercial": 2900,
        "Terreno": 1500, 
        "Barrio Privado": 4400,
        "Deposito de Logística": 2700,
    },
    "Formosa": {
        "_default_price_": 1900,
        "Casa": 3000,
        "Departamento": 2800,
        "Oficina": 3200,
        "Local Comercial": 2500,
        "Terreno": 1200, 
        "Barrio Privado": 4000,
        "Deposito de Logística": 2200,
    },
    "Jujuy": {
        "_default_price_": 2150,
        "Casa": 3200,
        "Departamento": 2950,
        "Oficina": 3400,
        "Local Comercial": 2600,
        "Terreno": 1350, 
        "Barrio Privado": 4100,
        "Deposito de Logística": 2500,
    },
    "La Pampa": {
        "_default_price_": 1750,
        "Casa": 2850,
        "Departamento": 2600,
        "Oficina": 3050,
        "Local Comercial": 2300,
        "Terreno": 1100, 
        "Barrio Privado": 3850,
        "Deposito de Logística": 2000,
    },
    "La Rioja": {
        "_default_price_": 2400,
        "Casa": 3600,
        "Departamento": 3300,
        "Oficina": 3800,
        "Local Comercial": 3000,
        "Terreno": 1600, 
        "Barrio Privado": 4600,
        "Deposito de Logística": 2800,
    },
    "Mendoza": {
        "_default_price_": 1600,
        "Casa": 2600,
        "Departamento": 2300,
        "Oficina": 2800,
        "Local Comercial": 2000,
        "Terreno": 1000, 
        "Barrio Privado": 3600,
        "Deposito de Logística": 1700,
    },
    "Misiones": {
        "_default_price_": 2500,
        "Casa": 3700,
        "Departamento": 3400,
        "Oficina": 3900,
        "Local Comercial": 3100,
        "Terreno": 1700, 
        "Barrio Privado": 4700,
        "Deposito de Logística": 2900,
    },
    "Neuquén": {
        "_default_price_": 1950,
        "Casa": 3150,
        "Departamento": 2850,
        "Oficina": 3350,
        "Local Comercial": 2550,
        "Terreno": 1250, 
        "Barrio Privado": 4050,
        "Deposito de Logística": 2300,
    },
    "Río Negro": {
        "_default_price_": 2100,
        "Casa": 3400,
        "Departamento": 3050,
        "Oficina": 3550,
        "Local Comercial": 2750,
        "Terreno": 1450, 
        "Barrio Privado": 4250,
        "Deposito de Logística": 2650,
    },
    "Salta": {
        "_default_price_": 1700,
        "Casa": 2750,
        "Departamento": 2450,
        "Oficina": 2950,
        "Local Comercial": 2150,
        "Terreno": 1080, 
        "Barrio Privado": 3750,
        "Deposito de Logística": 1850,
    },
    "San Juan": {
        "_default_price_": 2350,
        "Casa": 3550,
        "Departamento": 3250,
        "Oficina": 3750,
        "Local Comercial": 2950,
        "Terreno": 1550, 
        "Barrio Privado": 4550,
        "Deposito de Logística": 2750,
    },
    "San Luis": {
        "_default_price_": 1850,
        "Casa": 2900,
        "Departamento": 2650,
        "Oficina": 3150,
        "Local Comercial": 2350,
        "Terreno": 1180, 
        "Barrio Privado": 3950,
        "Deposito de Logística": 2050,
    },
    "Santa Cruz": {
        "_default_price_": 2250,
        "Casa": 3350,
        "Departamento": 3050,
        "Oficina": 3650,
        "Local Comercial": 2850,
        "Terreno": 1420, 
        "Barrio Privado": 4350,
        "Deposito de Logística": 2550,
    },
    "Santa Fe": {
        "_default_price_": 2000,
        "Casa": 3050,
        "Departamento": 2750,
        "Oficina": 3250,
        "Local Comercial": 2450,
        "Terreno": 1280, 
        "Barrio Privado": 4150,
        "Deposito de Logística": 2150,
    },
    "Santiago del Estero": {
        "_default_price_": 2450,
        "Casa": 3650,
        "Departamento": 3350,
        "Oficina": 3850,
        "Local Comercial": 3050,
        "Terreno": 1650, 
        "Barrio Privado": 4650,
        "Deposito de Logística": 2850,
    },
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur": {
        "_default_price_": 1580,
        "Casa": 2820,
        "Departamento": 2520,
        "Oficina": 3120,
        "Local Comercial": 2220,
        "Terreno": 1120, 
        "Barrio Privado": 3820,
        "Deposito de Logística": 1920,
    },
    "Tucumán": {
        "_default_price_": 2380,
        "Casa": 3580,
        "Departamento": 3280,
        "Oficina": 3780,
        "Local Comercial": 2980,
        "Terreno": 1580, 
        "Barrio Privado": 2580,
        "Deposito de Logística": 2780,
    },
};

// 4. La función que usará nuestro componente
//    (Esta lógica no cambia, funciona perfecto para el nuevo set de datos)
export const getPrecioPorM2 = (provincia: string, tipoPropiedad: string): number => {
    
    // 1. Buscamos la provincia en nuestros datos
    //    (Usamos 'provincia' como clave, ej: "Buenos Aires")
    const provinciaData = pricingData[provincia];

    // 2. Si la provincia no está en nuestra lista, usamos el default nacional
    if (!provinciaData) {
        return DEFAULT_NATIONAL_PRICE;
    }

    // 3. Buscamos el precio para ese tipo de propiedad específico
    //    (Usamos 'tipoPropiedad' como clave, ej: "Departamento")
    const precioEspecifico = (provinciaData as any)[tipoPropiedad];

    // 4. Si existe un precio específico (ej: "Departamento"), lo devolvemos
    if (precioEspecifico) {
        return precioEspecifico;
    }

    // 5. Si no hay precio (ej: "Oficina" en CABA), devolvemos el default de esa provincia
    return provinciaData["_default_price_"];
};