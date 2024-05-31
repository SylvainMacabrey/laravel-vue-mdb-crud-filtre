export const initialName = (fullname) => {
    const [ nickname, surname ] = fullname.split(" ");
    return `${ nickname.substring(0, 1) }${ surname.substring(0, 1) }`;
}

export const allInitialName = (users) => {
    const initials = [];
    users.forEach(user => {
        initials.push(initialName(user.name));
    });
    return initials;
}

export const formatDate = (date, country = "fr") => {
    const d = new Date(date);
    return d.toLocaleDateString(country);
}

export const listLinks = (links) => {
    links.pop();
    links.shift();
    return links;
}
