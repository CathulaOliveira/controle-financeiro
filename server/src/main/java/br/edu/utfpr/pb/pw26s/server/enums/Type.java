package br.edu.utfpr.pb.pw26s.server.enums;

public enum Type {

    CONTA_CORRENTE("Conta Corrente"),
    CONTA_POUPANCA("Conta Poupança"),
    CARTAO("Cartão");

    private String descricao;

    Type(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
