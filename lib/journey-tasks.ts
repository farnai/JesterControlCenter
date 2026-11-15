import map from './journey-map.json';
export const journeyTasks=map.nodes.map(node=>({
 id:`JST-MAP-${node.id}`,kind:'task',title:`${node.title} — მიღების შემოწმება`,
 area:'QA და ტესტირება',priority:['BIRTHDATE','VISIBILITY','AI','AI-GIFT','INTERNAL','CHAT','FINISH'].includes(node.id)?'P0':'P1',
 status:'Backlog',owner:'Gemini — Antigravity',phase:2,dependencies:[],related:[],due:'',
 description:`მომხმარებლის გზის ნაბიჯი: ${node.route}\nარსებული მდგომარეობა: ${node.current}\nსამიზნე: ${node.target}`,
 acceptance:node.checks.map((c,i)=>`${i+1}. ${c}`).join('\n'),
 brief:`ჯერ შეამოწმე მოქმედი კოდი და შესაბამისი დოკუმენტები; ეს არის QA/ანალიზის დავალება და არა დაუზუსტებელი ფუნქციების განხორციელების ნებართვა.\n${map.evidence}\n\nScope (წაკითხვა):\n${node.sources.join('\n')}\n\nგამოყენება: ${node.route}\nშემდეგი ნაბიჯები: ${node.next.join(', ')}\n\nსაერთო შემოწმებები:\n${map.commonChecks.join('\n')}\n\nსათითაოდ ჩაიწეროს PASS / FAIL / BLOCKED / NOT RUN და მტკიცებულება. შესრულებისათვის საჭირო ცვლილებები წარმოადგინე ცალკე scoped დავალებად. მონაცემების წაშლა და production-ზე ტესტირება არ არის ნებადართული.\nდაკავშირებული ფართო დავალება: ${'parent' in node ? node.parent : 'JST-014'}. არ არის ავტომატური dependency.`,
 notes:`ინვენტარი: ${map.version}. runtime QA ჯერ არ ჩატარებულა. ${'gap' in node?node.gap:''}`,
 links:node.sources.join('\n'),report:'',verification:'',comments:'',branch:'',evidence:'',
 journeyNode:node.id,needsVerification:true,updated:map.version,
}));
