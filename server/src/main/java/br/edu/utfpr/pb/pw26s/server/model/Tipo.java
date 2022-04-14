package br.edu.utfpr.pb.pw26s.server.model;

public enum Tipo {
    CC("Conta corrente"),
    CP("Conta poupança"),
    CARTAO("Cartão");

    private String descricao;

    Tipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
