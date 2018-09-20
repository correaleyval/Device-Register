var LdapAuth = require('ldapauth-fork');

module.exports = new LdapAuth({
    url: 'ldap://127.0.0.1:389',
    bindDN: '',
    bindCredentials: '',
    searchBase: 'ou=Usuarios,dc=uo,dc=edu,dc=cu',
    searchFilter: '(mail={{username}})',
    //searchFilter: '(sAMAccountName={{username}})',
    reconnect: true
});