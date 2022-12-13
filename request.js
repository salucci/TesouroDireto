
import fetch from 'node-fetch';
import cron from 'node-cron';

const showAll = false;

const alertTax = {
    "Tesouro Prefixado 2025" : 13.8,
    "Tesouro Prefixado 2029" : 14.0,
    "Tesouro IPCA+ 2045" : 6.25,
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

let url = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";

let settings = { method: "Get" };

cron.schedule('0,30 * * * * *', () => {
    fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        console.clear();
        for(let rawTreasury of json.response.TrsrBdTradgList)
        {
            if(rawTreasury.TrsrBd.minInvstmtAmt > 0 && typeof alertTax[rawTreasury.TrsrBd.nm] != 'undefined')
            {
                    let alvo;
                    if(rawTreasury.TrsrBd.anulInvstmtRate > alertTax[rawTreasury.TrsrBd.nm])
                    {
                       alvo = "Taxa alvo atingida";
                    }
                    else
                    {
                        if(!showAll) continue;
                        alvo = "Taxa alvo não atingida"
                    }

                    console.log(`${rawTreasury.TrsrBd.nm} - ${rawTreasury.TrsrBd.anulInvstmtRate} - ${alvo}`)

            }
        }
    });
} )