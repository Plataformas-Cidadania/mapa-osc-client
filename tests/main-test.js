const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
options = new chrome.Options();
options.addArguments("--headless");
// options.addArguments("--disable-gpu");
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');

/**
 * Deve ser alterado apontando para o ambiente que deve realizar o teste
 */
urlBase = 'http://localhost:8081/index.html';

const username = 'teste2@gmail.com';
const passwordApp = '654321';

/**
 * com setChromeOption o teste roda em background
 */
const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

/**
 * sem setChromeOption caso queira ver o teste de integração com chrome
 */
// const driver = new Builder()
//   .usingServer('http://localhost:9515')
//   // .setChromeOptions(options) 
//   .withCapabilities(webdriver.Capabilities.chrome())
//   .build();

function main(name, tests) {
  describe(name, function () {
    tests();
  });
}

function quit() {
  driver.close();
  driver.quit();
}

/**
 * Limpa Cookie antes  de abrir a sessão
 */
driver.manage().deleteAllCookies();
/**
 * Maximiza a tela
 */
driver.manage().window().maximize();

/**
 * Teste do MapaOsc Client
 */
main('MapaOsc', async () => {
  it("Abrindo a página ...", async () => {
    await driver.get(urlBase);
    await driver.wait(function () {
      return driver.executeScript('return document.readyState').then(function (readyState) {
        return readyState === 'complete';
      });
    });
    await driver.sleep(3000);
  });
});

/**
 * Verifica o título da página
 */
main('Starting ... ', function () {
  it("Pegando o título da página", async () => {
    await driver.wait(until.titleIs('Portal OSCs'), 30 * 1000);
    await driver.sleep(2000);
  });
});

/**
 * Pesquisa Municipio pela Modal (OBS: Talvez não precise dessa opção em produção)
 */
main('Pesquisa Municipio Modal', function () {
  it('Pesquisa Rio de Janeiro', async () => {
    await driver.sleep(2000);
    await driver.wait(function () {
      return driver.executeScript('return document.readyState').then(function (readyState) {
        return readyState === 'complete';
      });
    });
    await driver.wait(function () {
      return driver.findElement(By.className('modal-body'));
    }, 2000);
    await driver.wait(function () {
      return driver.findElement(By.xpath("//div[@id='modalLocalidade']"));
    }, 2000);
    await driver.executeScript(" return $('#localidade').val('Rio de Janeiro - RJ')");
    await driver.sleep(2000);
    await driver.executeScript(" return $('#localidade').click()");
    await driver.sleep(2000);
    await driver.executeScript(" return $('#localidade').keydown()");
    await driver.sleep(2000);
    await driver.executeScript(" return $('.ui-menu-item-wrapper').click()");
    await driver.sleep(2000);
    await driver.executeScript(" return $('#localidade').val()").then((value) => {
      if (value === 'Rio de Janeiro - RJ') {
        return true;
      } else {
        return quit();
      }
    });
    await driver.sleep(2000);
    await driver.wait(function () {
      return driver.findElement(By.id("btn-localidade-modal"));
    }, 2000);
    await driver.executeScript(" return $('#btn-localidade-modal')[0].click()");
    await driver.sleep(2000);
  });
});

/**
 * Pesquisa Goiás - GO Mapa
 */
main('Pesquisa Municipio Mapa', function () {
  it('Pesquisa Goiás - GO', async () => {
    await driver.sleep(2000);
    await driver.wait(function () {
      return driver.executeScript('return document.readyState').then(function (readyState) {
        return readyState === 'complete';
      });
    });
    await driver.findElement(By.xpath("//a[@href='#municipio']")).click();
    await driver.executeScript("return $('#municipio :input').val('Goiás - GO').keydown()");
    await driver.sleep(2000);
    await driver.wait(function () {
      return driver.executeScript("return $('.ui-menu-item-wrapper').click()");
    }, 5000);
  });
});

/**
 * Efetua o Login na aplicação
 */
main('Login', function () {
  it('Usuario Teste', async () => {
    await driver.wait(function () {
      return driver.executeScript('return document.readyState').then(function (readyState) {
        return readyState === 'complete';
      });
    });
    await driver.wait(function () {
      return driver.executeScript("return $('#btnEntrar').click()");
    }, 3000);
    await driver.sleep(5000);
    await driver.wait(function () {
      return driver.executeScript("return $('#emailLogin')" + `.val('${username}')`);
    }, 3000);
    await driver.sleep(5000);
    await driver.wait(function () {
      return driver.executeScript("return $('#senhaLogin')" + `.val('${passwordApp}')`);
    }, 3000);
    await driver.sleep(3000);
    await driver.executeScript("return $('#btn-logar-modal')[0].click()");
    await driver.sleep(3000);
    await driver.wait(function () {
      return driver.executeScript(" return $('#labelError').click()[0].innerText").then((value) => {
        if (value === 'E-mail e/ou senha incorretos. Tente novamente.') {
          driver.manage().deleteAllCookies();
          driver.quit();
          process.exit(1);
          throw Error('Algo deu Errado em Login no Usuario Teste');
        } else {
          return true;
        }
      });
    }, 3000);
    await driver.sleep(5000);
  });
})

/**
 * Pesquisa Avançada
 */
main('Pesquisa Avançada', function () {
  it('Pesquisa Brasília - DF', async () => {
    await driver.wait(function () {
      return driver.executeScript('return document.readyState').then(function (readyState) {
        return readyState === 'complete';
      });
    });
    await driver.sleep(5000);
    await driver.executeScript(" return $('.consultaAvancada a span').click()");
    await driver.sleep(2000);
    await driver.wait(function () {
      return driver.executeScript('return document.readyState').then(function (readyState) {
        return readyState === 'complete';
      });
    }, 2000);
    await driver.sleep(3000);
    await driver.wait(function () {
      return driver.executeScript("return $('#tx_nome_uf').val('Distrito Federal').keydown()");
    }, 2000);
    await driver.wait(function () {
      return driver.executeScript("return $('#tx_nome_municipio').val('Brasília - DF').keydown()");
    }, 2000);
    await driver.sleep(3000);
    await driver.wait(function () {
      return driver.executeScript("return $('#naturezaJuridica_organizacaoSocial').click()");
    }, 2000);
    await driver.wait(function () {
      return driver.executeScript("return $('#btnConsultar').click()");
    }, 2000);
    await driver.sleep(3000);
    driver.executeScript("return $('.logoMapa').click()");
    await driver.sleep(3000);
  });
})

/**
 * Detalhar e Editar OSC (OBS: Talvez esse teste demore muito tempo, por conta da aplicação)
 */
main('Detalhar / Editar Osc', function () {
  it('Organização de Teste', async () => {
    await driver.sleep(3000);
    await driver.wait(function () {
      return driver.executeScript('return document.readyState').then(function (readyState) {
        return readyState === 'complete';
      });
    }, 2000);
    await driver.executeScript("return $('#btnEditarOSCs')[0].click()");
    await driver.sleep(5000);
    await driver.executeScript("return $('#lista_minhas_oscs tbody tr td button').click()");
    await driver.wait(function () {
      return until.elementIsVisible('custom-file-upload');
    });
    await driver.sleep(70000);
    await driver.executeScript("return $('#tx_nome_fantasia_osc').val('Organização de Teste Teste')");
    await driver.sleep(3000);
    await driver.executeScript("return $('#tx_nome_fantasia_osc').val('Organização de Teste')");
    await driver.sleep(2000);
    await driver.executeScript("return $('#salvar').click()");
  });
  driver.manage().deleteAllCookies();
  after(async () => driver.quit());
})
