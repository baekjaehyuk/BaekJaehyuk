import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `<h2> My Profile 👋 </h2> 

- 📘 Myongji UNIV. Convergence Software 
- 🌱 I’m currently learning BackEnd 

<h3 align="center"> 🔧 Main Stack  </h3> 

<p align="center">
  <img alt="" src= "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"/> 
  <img alt="" src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
  <img alt="" src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  </br>
  <img alt="" src= "https://img.shields.io/badge/MySQL-4B89DC?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img alt="" src= "https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white"/>
  <img alt="" src= "https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
</p>

## 📕 Latest Blog Posts 

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://maehyuk.tistory.com/rss'); // 본인의 블로그 주소
    
    text += `<ul>`;

    const maxItems = 10;
    const itemsToProcess = Math.min(feed.items.length, maxItems);

    for (let i = 0; i < itemsToProcess; i++) {
        const { title, link } = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;
    
    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();