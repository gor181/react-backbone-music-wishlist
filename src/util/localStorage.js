const localStorage = window.localStorage;

module.exports = function local(namespace) {
    
    function jp(o) {
        return JSON.parse(o);
    }

    function js(o) {
        return JSON.stringify(o);
    }

    //Initialize the localStorage and add app name space
    if (!localStorage.getItem(namespace)) {
        localStorage.setItem(namespace, js({}));
    }

    function store(o) {
       const data = { ...jp(localStorage.getItem(namespace)), ...o };
       localStorage.setItem(namespace, js(data));
    }

    function getKey(key) {
        return jp(localStorage.getItem(namespace))[key];
    }

    return { store, getKey };
};
