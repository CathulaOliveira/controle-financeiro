package br.edu.utfpr.pb.pw26s.server.model;

public enum TipoMovimentacao {
    RECEITA("Receita"),
    DESPESA("Despesa"),
    TRANFERENCIA("Transferência entre contas");

    private String descricao;

    TipoMovimentacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
