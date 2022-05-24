package br.edu.utfpr.pb.pw26s.server.enums;

public enum TypeTransaction {

    RECEITA("Receita"),
    DESPESA("Despesa"),
    TRANSFERENCIA("Transferência entre contas");

    private String descricao;

    TypeTransaction(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
