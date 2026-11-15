import {readFileSync,existsSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const map=JSON.parse(readFileSync('lib/journey-map.json','utf8'));
const root=process.env.JESTER_REPO_ROOT ? resolve(process.env.JESTER_REPO_ROOT) : (existsSync(resolve('../Jester')) ? resolve('../Jester') : resolve('../../..'));
const ids=new Set(map.nodes.map(n=>n.id));
assert.equal(ids.size,map.nodes.length,'Duplicate node');
for(const n of map.nodes){
 assert(map.groups.includes(n.group));
 assert(n.current&&n.target&&n.checks.length&&n.sources.length);
 for(const id of n.next)assert(ids.has(id),`${n.id}: missing next ${id}`);
 for(const path of n.sources)assert(existsSync(resolve(root,path)) || existsSync(resolve(path)),`Missing source ${path}`);
}
for(const journey of map.journeys)for(const id of journey.steps)assert(ids.has(id));
const lines=['# Jester — მომხმარებლის გზის რუკა','',`ინვენტარი: ${map.version}. ${map.evidence}`,'','წყარო: `lib/journey-map.json`. ცვლილებების შემდეგ გაუშვი `node scripts/verify-journey-map.mjs`. ეს არის სამუშაო რუკა და არა ახალი კანონიკური პროდუქტის სპეციფიკაცია.',''];
for(const group of map.groups){lines.push(`## ${group}`,'');for(const n of map.nodes.filter(n=>n.group===group)){
 lines.push(`### ${n.id} · ${n.title}`,'',`გზა: ${n.route}`,`ტიპი: ${n.kind}`,'',`**არსებული:** ${n.current}`,'',`**სამიზნე / გადასაწყვეტი:** ${n.target}`,'');
 if(n.gap)lines.push(`**დასაზუსტებელი:** ${n.gap}`,'');
 if(n.privacy)lines.push(`**პირადი მონაცემების საზღვარი:** ${n.privacy}`,'');
 lines.push(...n.checks.map(c=>`- [ ] ${c}`),'',`კოდი: ${n.sources.map(s=>'`'+s+'`').join(', ')}`,`შემდეგ: ${n.next.join(', ')}`,`სამუშაო დავალება: JST-MAP-${n.id}`,'');
}}
writeFileSync('USER_JOURNEY_MAP.md',lines.join('\n')+'\n');
console.log(JSON.stringify({nodes:ids.size,checks:map.nodes.reduce((s,n)=>s+n.checks.length,0),journeys:map.journeys.length,sources:'all exist',links:'valid'}));
