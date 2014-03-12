var ExchangeRatesTable = Ember.Object.extend({
    isLoading: false,
    isError: false
});

ExchangeRatesTable.reopenClass({
    QUERY: "USE 'https://raw.github.com/cowbell/yql-tables/master/nbp/nbp.dir.xml';" +
        "USE 'https://raw.github.com/cowbell/yql-tables/master/nbp/nbp.tables.xml';" +
        "SELECT * FROM nbp.tables WHERE id IN (SELECT id FROM nbp.dir WHERE typ = 'A' AND data_publikacji < '%@' | SORT(field='data_publikacji') | TAIL(count=1));",

    find: function (issueDate) {
        var model = this.create({ isLoading: true });

        $.ajax("https://query.yahooapis.com/v1/public/yql", { data: { format: "json", q: this.QUERY.fmt(issueDate) } })
            .then(function (response) {
                if (response.query.results) {
                    return response.query.results.tabela_kursow;
                } else {
                    return $.Deferred().reject(response);
                }
            })
            .done(function (response) {
                model.setProperties(response);
            })
            .fail(function () {
                model.set("isError", true);
            })
            .always(function () {
                model.set("isLoading", false);
            });

        return model;
    }
});

export default ExchangeRatesTable;
