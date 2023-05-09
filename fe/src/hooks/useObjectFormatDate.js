

export const useObjectFormatDate = (array) => {

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];
    const formatedItems = array.map((item) => {
        const dataObj = new Date(item?.date);

        dataObj.setHours(dataObj.getHours() + 12)

        const dia = dataObj.getDate();


        const mes = dataObj.getMonth();
        const ano = dataObj.getFullYear();

        return { ...item, date: dataObj };
    });

    return formatedItems;
}