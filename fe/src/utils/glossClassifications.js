const classification = [
    {
        id: Math.random(),
        name: "Mão de Obra",
        value: "labor"
    },
    { id: Math.random(), name: "Processo ou Procedimento", value: "process" },
    { id: Math.random(), name: "Logística", value: "logistics" },
    { id: Math.random(), name: "Segurança", value: "security" },
    {
        id: Math.random(),
        name: "Equipamento",
        value: "equipment",
        subCategory: [
            { id: Math.random(), name: "Carro Sonda", value: "rig_car" },
            { id: Math.random(), name: "Mastro", value: "mast" },
            { id: Math.random(), name: "Guincho Sonda", value: "rig_winch" },
            { id: Math.random(), name: "Transmissão Sonda", value: "rig_transmission" },
            { id: Math.random(), name: "UCI", value: "uci" },
            { id: Math.random(), name: "Tanque de Lama", value: "mud_tank" },
            { id: Math.random(), name: "Trailer", value: "trailer" },
            { id: Math.random(), name: "Bomba de Lama", value: "mud_bomb" },
            { id: Math.random(), name: "Pipe Rack", value: "pipe_rack" },
            { id: Math.random(), name: "BOP", value: "bop" },
            { id: Math.random(), name: "Choke Manifold", value: "choke_manifold" },
            { id: Math.random(), name: "Mangueiras", value: "hoses" },
            { id: Math.random(), name: "Chave Hidráulica", value: "hydraulic_wrench" },
            { id: Math.random(), name: "Ferramentas de Manuseio", value: "handling_tools" },
            { id: Math.random(), name: "Outros", value: "others" },
        ]
    }
]

export default classification;