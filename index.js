import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";


let text = `<h2> 백재혁 | Jaehyuk Baek 👋 </h2> 

- 저는 명지대학교 융합소프트웨어학부에 재학 중입니다.

## 📕 최근 블로그 포스팅

`;

const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    const feed = await parser.parseURL('https://maehyuk.tistory.com/rss'); // 본인의 블로그 주소
    
    text += `<ul>`;

    const maxItems = 5;
    const itemsToProcess = Math.min(feed.items.length, maxItems);

    for (let i = 0; i < itemsToProcess; i++) {
        const { title, link } = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;
    
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();