$(document).ready(function () {
    // CADASTRO:
    $('#btnRegistrar').click(function () {
        $('#formCadastro').attr('onsubmit', 'return false;');

        var objRa = document.getElementById("ra");
        var objNome = document.getElementById("nome");
        var objSenha = document.getElementById("senha");
        var objConfirmSenha = document.getElementById("confirmSenha");

        var ra = objRa.value;
        var nome = objNome.value;
        var senha = objSenha.value;
        var confirmSenha = objConfirmSenha.value;

        if (ra && nome && senha && confirmSenha) {
            if (ra.length == 5) {
                if (senha == confirmSenha) {
                    $.getJSON('/cadastrado/' + ra + '/' + nome + '/' + senha + '/' + confirmSenha, function (result) {
                        if (result.mensagem == 'retorno') {
                            notification.show('Cadastro realizado com sucesso!', 'success');
                            setTimeout(function () {
                                const modal = document.querySelector('.bg-modal');
                                window.location.href = '#inicio';
                                modal.style.display = "flex";
                            }, 1500);
                        }
                    });
                } else {
                    notification.show('Repita a mesma senha', 'danger');
                }
            } else {
                notification.show('Seu RA deve conter cinco caracteres', 'danger');
            }
        } else {
            notification.show('Preencha todos os campos', 'danger');
        }
    });

    // LOGIN:
    $('#btnLogar').click(function () {
        $('#formLogin').attr('onsubmit', 'return false;');

        var objRa = document.getElementById("txtRA");
        var objSenha = document.getElementById("txtSenha");

        var ra = objRa.value;
        var senha = objSenha.value;

        if (ra && senha) {
            if (ra.length == 5) {
                $.getJSON('/login/' + ra + '/' + senha, function (result) {
                    console.log(result);
                    if (result.mensagem == 'não-cadastrado') {
                        notification.show('Você ainda não possuí conta', 'danger');
                    }
                    if (result.mensagem == 'senha-errada') {
                        notification.show('Senha incorreta', 'danger');
                    }
                    if (result.mensagem == 'cadastrado') {
                        $.getJSON('/atualizar-atividade/online', function (retorno) {
                            if (retorno.mensagem == 'retorno') {
                                notification.show('Logado com sucesso!', 'success');
                                setTimeout(function () {
                                    window.location.href = '/area-aluno';
                                }, 1000);
                            }
                        })
                    }
                });
            } else {
                notification.show('Seu RA deve conter cinco caracteres', 'danger');
            }
        } else {
            notification.show('Preencha todos os campos', 'danger');
        }
    })
})

var notification = new Notif({
    topPos: 10,
    classNames: 'success danger',
    autoClose: true,
    autoCloseTimeout: 3000
});

function Notif(option) {
    var el = this;

    el.self = $('.toast-message');
    el.close = this.self.find('.close-message');
    el.message = el.self.find('.message');
    el.top = option.topPos;
    el.classNames = option.classNames;
    el.autoClose = (typeof option.autoClose === "boolean") ? option.autoClose : false;
    el.autoCloseTimeout = (option.autoClose && typeof option.autoCloseTimeout === "number") ? option.autoCloseTimeout : 3000;


    // Methods
    el.reset = function () {
        el.message.empty();
        el.self.removeClass(el.classNames);
    }
    el.show = function (msg, type) {
        el.reset();
        el.self.css('top', el.top);
        el.message.text(msg);
        el.self.addClass(type);

        if (el.autoClose) {
            setTimeout(function () {
                el.hide();
            }, el.autoCloseTimeout);
        }
    }
    el.hide = function () {
        el.self.css('top', '-100%');
        el.reset();
    };

    el.close.on('click', this.hide);
}