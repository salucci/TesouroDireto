
import https from 'https';
import fetch from 'node-fetch';

const alertTax = {
    "Tesouro Prefixado 2025" : 13.0,
    "Tesouro Prefixado 2029" : 14.0,
    "Tesouro IPCA+ 2045" : 6.1,
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

let url = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";

let settings = { method: "Get" };

fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        for(let i in json.response.TrsrBdTradgList)
        {
            let titulo = json.response.TrsrBdTradgList[i].TrsrBd;
            if(titulo.minInvstmtAmt > 0)
            {
                let alvo = (titulo.anulInvstmtRate > alertTax[titulo.nm]) ? "Taxa alvo atingida" : "Taxa alvo não atingida"
                console.log(`${titulo.nm} - ${titulo.anulInvstmtRate} - ${alvo}`)
            }
        }
    });