# Jester — მომხმარებლის გზის რუკა

ინვენტარი: 2026-11-15. კოდის ინვენტარი; მიმდინარე პროდუქტის სრული runtime შემოწმება არ ჩატარებულა.

წყარო: `lib/journey-map.json`. ცვლილებების შემდეგ გაუშვი `node scripts/verify-journey-map.mjs`. ეს არის სამუშაო რუკა და არა ახალი კანონიკური პროდუქტის სპეციფიკაცია.

## შესვლა

### ENTRY · პირველი ვიზიტი და საჯარო შესასვლელი

გზა: / → /auth/register
ტიპი: route

**არსებული:** ავტორიზაციის გარეშე მთავარი გვერდი რეგისტრაციაზე გადადის; /welcome, /auth/choice, /get-started იგივე გზაა.

**სამიზნე / გადასაწყვეტი:** საწყის ეკრანზე გასაგებად გამოჩნდეს თვითშეცნობის ღირებულება და რეგისტრაციის მოქმედება; ცალკე landing-ის ფორმა დასამტკიცებელია.

**დასაზუსტებელი:** ცალკე მარკეტინგული landing არ არის; მიმდინარე HTML სათაური და ენა გადასახედია.

- [ ] სუფთა ბრაუზერი /-ზე ხსნის რეგისტრაციას
- [ ] შესული მომხმარებელი ხედავს Home-ს ან დაუმთავრებელ onboarding-ს
- [ ] კამპანიის ატრიბუცია არ იკარგება გადამისამართებაზე
- [ ] ქართული სათაური და გაზიარების metadata შემოწმებულია

კოდი: `frontend/src/navigation/ProtectedRoute.tsx`, `frontend/src/navigation/AppRoutes.tsx`, `frontend/index.html`
შემდეგ: REGISTER, LOGIN
სამუშაო დავალება: JST-MAP-ENTRY

### REGISTER · ანგარიშის შექმნა

გზა: /auth/register
ტიპი: route

**არსებული:** ელფოსტა, პაროლი, პაროლის გამეორება, სიძლიერის მინიშნება; რეგისტრაცია Supabase-ით.

**სამიზნე / გადასაწყვეტი:** მკაფიო შეცდომები, წარმატების სწორი გზა და ოპერაციული პირობების/კონფიდენციალურობის შეთანხმებული წარდგენა.

- [ ] არასწორი ელფოსტა და 6 სიმბოლოზე მოკლე პაროლი არ იგზავნება
- [ ] პაროლების აცდენა გასაგებად ჩანს
- [ ] არსებული ანგარიში მომხმარებელს სწორ გზას სთავაზობს
- [ ] ქსელის შეცდომაზე ფორმა აღდგენადია
- [ ] double-submit არ ქმნის გაურკვეველ მდგომარეობას

კოდი: `frontend/src/modules/auth/RegisterPage.tsx`, `frontend/src/core/auth/context.tsx`
შემდეგ: VERIFY, IDENTITY
სამუშაო დავალება: JST-MAP-REGISTER

### OAUTH · Google / Apple-ით გაგრძელება

გზა: /auth/register · /auth/login
ტიპი: component

**არსებული:** SocialAuthButtons იძახებს Supabase OAuth-ს და /auth/callback-ს.

**სამიზნე / გადასაწყვეტი:** production provider-ების გამართული კონფიგურაცია; ღილაკების არსებობა მუშა OAuth-ს არ ადასტურებს.

**დასაზუსტებელი:** Google/Apple-ის გარე ანგარიშების კონფიგურაცია ამ ანალიზში არ შემოწმებულა.

- [ ] ორივე provider ცალ-ცალკე შემოწმებულია
- [ ] გაუქმება და შეცდომა გასაგებია
- [ ] redirect URL სწორია
- [ ] უკვე არსებულ ელფოსტასთან ქცევა შემოწმებულია

კოდი: `frontend/src/modules/auth/SocialAuthButtons.tsx`, `frontend/src/modules/auth/AuthCallbackPage.tsx`
შემდეგ: CALLBACK
სამუშაო დავალება: JST-MAP-OAUTH

### VERIFY · ელფოსტის დადასტურება

გზა: /auth/verify-email
ტიპი: route

**არსებული:** დადასტურების მოთხოვნის შემდეგ იხსნება წერილის გვერდი.

**სამიზნე / გადასაწყვეტი:** წერილის რეალური მიღება და ხელახლა გაგზავნა; დაკარგული ელფოსტის კონტექსტის აღდგენა.

- [ ] ახალი წერილი მოდის production SMTP-დან
- [ ] resend-ის ლიმიტი და შეტყობინება გასაგებია
- [ ] გვერდის refresh არ ტოვებს ჩიხში
- [ ] ვადაგასული/უკვე გამოყენებული ბმული აღდგენადია

კოდი: `frontend/src/modules/auth/VerifyEmailPage.tsx`, `frontend/src/modules/auth/RegisterPage.tsx`
შემდეგ: CALLBACK, LOGIN
სამუშაო დავალება: JST-MAP-VERIFY

### CALLBACK · დადასტურებისა და OAuth-ის დაბრუნება

გზა: /auth/callback
ტიპი: route

**არსებული:** სესიის დამუშავების შემდეგ Home ან onboarding; შეცდომისა და timeout-ის ეკრანი.

**სამიზნე / გადასაწყვეტი:** ყველა შესვლის მეთოდი მთავრდება ერთი გამართული სესიით.

- [ ] დადასტურებულ ახალ მომხმარებელს ხვდება onboarding
- [ ] დასრულებული მომხმარებელი მიდის Home-ზე
- [ ] არასწორი ბმული გვთავაზობს resend/login-ს
- [ ] 15-წამიანი timeout და ნელი ქსელი შემოწმებულია

კოდი: `frontend/src/modules/auth/AuthCallbackPage.tsx`, `frontend/src/core/auth/context.tsx`
შემდეგ: IDENTITY, HOME
სამუშაო დავალება: JST-MAP-CALLBACK

### LOGIN · შესვლა და დაბრუნება

გზა: /auth/login
ტიპი: route

**არსებული:** ელფოსტით შესვლა, OAuth, დამახსოვრებული მიმართულების მხარდაჭერა.

**სამიზნე / გადასაწყვეტი:** დაბრუნებული მომხმარებლის სწრაფი შესვლა; დაუმთავრებელი onboarding-ის გაგრძელება.

- [ ] არასწორი პაროლი და ქსელის შეცდომა
- [ ] შესვლა ახალი და დასრულებული პროფილით
- [ ] დაცული deep link-ის აღდგენა
- [ ] მომხმარებლის შეცვლისას წინა მონაცემები ქრება

კოდი: `frontend/src/modules/auth/LoginPage.tsx`, `frontend/src/navigation/ProtectedRoute.tsx`, `frontend/src/core/auth/context.tsx`
შემდეგ: HOME, IDENTITY, RESET
სამუშაო დავალება: JST-MAP-LOGIN

### RESET · პაროლის აღდგენა

გზა: /auth/reset-password
ტიპი: route

**არსებული:** აღდგენის წერილის მოთხოვნა და ახალი პაროლის ფორმა; /reset-password alias.

**სამიზნე / გადასაწყვეტი:** წერილის ბმული სწორი დომენით და უსაფრთხო სესიის განახლება.

- [ ] აღდგენის წერილი მიდის
- [ ] ვადაგასული ბმული
- [ ] პაროლის გამეორების შემოწმება
- [ ] განახლების შემდეგ შესვლა ახალი პაროლით

კოდი: `frontend/src/modules/auth/ResetPasswordPage.tsx`
შემდეგ: LOGIN
სამუშაო დავალება: JST-MAP-RESET

## ონბორდინგი

### IDENTITY · 1 · სახელი და გვარი

გზა: /onboarding/birth-data · 1/8
ტიპი: step

**არსებული:** სახელი/გვარი ინახება პროფილში; display_name სერვერიდან ბრუნდება. პირველი უკან ღილაკი signOut-ს აკეთებს.

**სამიზნე / გადასაწყვეტი:** აუცილებელი ველები, გასაგები კონფიდენციალურობა და პროგრესის შენახვა.

**პირადი მონაცემების საზღვარი:** სახელი სოციალური პროფილის ნაწილია; სხვა birth-data არ გამოვიტანოთ.

- [ ] ცარიელი/გამოტოვებებით შევსებული სახელები
- [ ] ქართული გრძელი სახელი მობილურზე
- [ ] წარმატებული შენახვის შემდეგ ნაბიჯი 2
- [ ] უკან დაბრუნება და გამოსვლის შეცდომა
- [ ] refresh-ის შემდეგ სწორი აღდგენა

კოდი: `frontend/src/modules/onboarding/BirthDataOnboardingPage.tsx`, `frontend/src/modules/onboarding/steps/BasicProfileStep.tsx`, `backend/app/profiles/router.py`
შემდეგ: BIRTHDATE
სამუშაო დავალება: JST-MAP-IDENTITY

### BIRTHDATE · 2 · დაბადების თარიღი და 18+

გზა: /onboarding/birth-data · 2/8
ტიპი: step

**არსებული:** თარიღის არჩევა და birth-data API-ში შენახვა; backend უარყოფს არასრულწლოვანს.

**სამიზნე / გადასაწყვეტი:** თარიღის ვალიდაცია და ზრდასრულობის ერთიანი დაცვა ყველა საჭირო გზაზე.

**პირადი მონაცემების საზღვარი:** თარიღი პირადია: არ გადაეცეს ანალიტიკას, სხვა მომხმარებელს ან გაზიარებულ ბარათს.

- [ ] ზუსტად მე-18 დაბადების დღე
- [ ] 29 თებერვალი და მომავალი თარიღი
- [ ] დაუმთავრებელი თარიღი
- [ ] backend უარყოფს bypass-ს
- [ ] refresh და უკან დაბრუნება

კოდი: `frontend/src/modules/onboarding/steps/BirthDateStep.tsx`, `frontend/src/shared/ui/birthDateUtils.ts`, `backend/app/astrology/validation.py`
შემდეგ: BIRTHTIME
სამუშაო დავალება: JST-MAP-BIRTHDATE

### BIRTHTIME · 3 · დაბადების დრო

გზა: /onboarding/birth-data · 3/8
ტიპი: step

**არსებული:** ზუსტი, მიახლოებითი ან უცნობი დრო; unknown გზაზე null იგზავნება.

**სამიზნე / გადასაწყვეტი:** უცნობი დრო დასაშვებია, გამოგონილი დრო/Ascendant/Houses დაუშვებელია.

**დასაზუსტებელი:** wizard-ის საწყისი state არის exact / 12:00; გადამოწმდეს დაუდასტურებელი default-ის გაგზავნის რისკი.

**პირადი მონაცემების საზღვარი:** დრო პირადია.

- [ ] სამივე რეჟიმით შენახვა
- [ ] unknown რეალურად null-ია
- [ ] უცნობიდან ზუსტზე და უკან გადასვლა
- [ ] დეფოლტური 12:00 არ ჩაითვალოს მომხმარებლის ცნობილ დროდ

კოდი: `frontend/src/modules/onboarding/steps/BirthTimeStep.tsx`, `frontend/src/modules/onboarding/BirthDataOnboardingPage.tsx`, `backend/app/astrology/validation.py`
შემდეგ: BIRTHPLACE
სამუშაო დავალება: JST-MAP-BIRTHTIME

### BIRTHPLACE · 4 · დაბადების ადგილი

გზა: /onboarding/birth-data · 4/8
ტიპი: step

**არსებული:** ქალაქის კატალოგი, birth_city_id, კოორდინატები და timezone.

**სამიზნე / გადასაწყვეტი:** კანონიკური ქალაქი და IANA timezone; ეს არ არის საჯარო საცხოვრებელი ქალაქი.

**პირადი მონაცემების საზღვარი:** კოორდინატები და დაბადების ადგილი მხოლოდ მფლობელის მონაცემებია.

- [ ] ქართული/ლათინური ძიება
- [ ] ქალაქის გარეშე წინ არ გადადის
- [ ] მდებარეობის შეცვლისას timezone ახლდება
- [ ] უცნობი ქალაქი და ქსელის შეცდომა
- [ ] პოლარული შემთხვევა არ ცვლის ჩუმად სახლთა სისტემას

კოდი: `frontend/src/modules/onboarding/steps/BirthPlaceStep.tsx`, `backend/app/geo/service.py`, `backend/app/astrology/router.py`
შემდეგ: CITY
სამუშაო დავალება: JST-MAP-BIRTHPLACE

### CITY · 5 · საცხოვრებელი ქალაქი

გზა: /onboarding/birth-data · 5/8
ტიპი: step

**არსებული:** current_city_id და პროფილის ქალაქი ინახება; არჩევანი აუცილებელია.

**სამიზნე / გადასაწყვეტი:** დაბადების ადგილისგან გამიჯნული საჯარო სოციალური ინფორმაცია.

- [ ] ქალაქის არჩევა/შეცვლა
- [ ] თვითნებური ტექსტი ვერ ცვლის canonical ID-ს
- [ ] წარუმატებელი შენახვა არ გადადის შემდეგზე
- [ ] refresh აღადგენს ქალაქს

კოდი: `frontend/src/modules/onboarding/steps/WhereYouLiveStep.tsx`, `backend/app/profiles/router.py`
შემდეგ: INTERESTS
სამუშაო დავალება: JST-MAP-CITY

### INTERESTS · 6.1 · ინტერესები

გზა: /onboarding/birth-data · 6/8 → 1/3
ტიპი: substep

**არსებული:** მე-6 ნაბიჯის პირველი ქვესაფეხური: კატეგორიები, ძიება, ინტერესების შენახვა; optional მოდულის გამოტოვება.

**სამიზნე / გადასაწყვეტი:** ინტერესების არჩევა გასაგებია, კატალოგი და სერვერის ლიმიტები თანხმდება.

**დასაზუსტებელი:** წინასწარი ჩატვირთვის შეცდომები ცარიელ სიებად გარდაიქმნება; მონაცემების გადაფარვის რისკი შესამოწმებელია.

- [ ] ქართული/ინგლისური/alias ძიება
- [ ] მინიმუმ/მაქსიმუმის UI და API თანხვედრა
- [ ] უკვე არჩეულის აღდგენა
- [ ] გამოტოვება გადადის ფოტოზე
- [ ] ჩატვირთვის ჩავარდნა არ წაშლის ძველ არჩევანს

კოდი: `frontend/src/modules/onboarding/steps/ProfileEnrichmentModule.tsx`, `frontend/src/modules/onboarding/steps/InterestsStep.tsx`, `backend/app/interests/router.py`
შემდეგ: TRAITS, PHOTO
სამუშაო დავალება: JST-MAP-INTERESTS

### TRAITS · 6.2 · ხასიათის აღწერა

გზა: /onboarding/birth-data · 6/8 → 2/3
ტიპი: substep

**არსებული:** მომხმარებელი თავად ირჩევს ხასიათის descriptors-ს; ინახება enrichment API-ით.

**სამიზნე / გადასაწყვეტი:** ეს თვითაღწერაა და არა AI დიაგნოზი; optional ნაბიჯი.

- [ ] არჩევა და შენახვა
- [ ] უკან დაბრუნება ინტერესებზე
- [ ] გამოტოვება
- [ ] შენახვის შეცდომის retry
- [ ] ხილვადობის სწორი კონტრაქტი

კოდი: `frontend/src/modules/onboarding/steps/PersonalityStep.tsx`, `frontend/src/modules/onboarding/steps/ProfileEnrichmentModule.tsx`, `backend/app/enrichment/router.py`
შემდეგ: INTENTIONS, PHOTO
სამუშაო დავალება: JST-MAP-TRAITS

### INTENTIONS · 6.3 · რას ვეძებ

გზა: /onboarding/birth-data · 6/8 → 3/3
ტიპი: substep

**არსებული:** კავშირის მიზნების არჩევა და შენახვა.

**სამიზნე / გადასაწყვეტი:** მიზნები შეესაბამება მრავალმხრივ სოციალურ პროდუქტს; romantic ვარაუდი ავტომატურად არ კეთდება.

- [ ] კატალოგის ჩატვირთვა
- [ ] შენახვა და უკან დაბრუნება
- [ ] optional skip
- [ ] არჩევანის განახლება პროფილში
- [ ] ახალი მიზანი არ ცვლის სინასტრიის მათემატიკას

კოდი: `frontend/src/modules/onboarding/steps/IntentionsStep.tsx`, `backend/app/enrichment/router.py`
შემდეგ: PHOTO
სამუშაო დავალება: JST-MAP-INTENTIONS

### PHOTO · 7 · პროფილის ფოტო

გზა: /onboarding/birth-data · 7/8
ტიპი: step

**არსებული:** ფოტოს ატვირთვა ან გამოტოვება, შემდეგ ნაბიჯი 8.

**სამიზნე / გადასაწყვეტი:** სწორი ფორმატი/ზომა, პირადი მედია და უსაფრთხო fallback.

**პირადი მონაცემების საზღვარი:** რეალური პირადი ფოტოები QA მონაცემებად არ გამოიყენოთ.

- [ ] დასაშვები ფორმატი და ზედმეტი ზომა
- [ ] ატვირთვის წყვეტა და retry
- [ ] EXIF/GPS არ ინახება გამოსავალში
- [ ] ფოტოს გარეშე გაგრძელება
- [ ] დაბლოკილმა ვერ უნდა ნახოს პირადი მედია

კოდი: `frontend/src/modules/onboarding/steps/ProfilePhotoStep.tsx`, `backend/app/profiles/photos.py`
შემდეგ: FINISH
სამუშაო დავალება: JST-MAP-PHOTO

### FINISH · 8 · გადამოწმება და დასრულება

გზა: /onboarding/birth-data · 8/8
ტიპი: step

**არსებული:** შეჯამება, ნაბიჯზე დაბრუნება და completeOnboarding API; დასრულებული პროფილის შემდეგ Home.

**სამიზნე / გადასაწყვეტი:** დასრულება სერვერის მიერ დადასტურებული მდგომარეობაა.

**დასაზუსტებელი:** Finish-ის interestsCount და enrichment-ის ახალი არჩევანის სინქრონიზაცია ცალკე შეამოწმეთ.

- [ ] სავალდებულო მონაცემის გამოტოვება უარყოფილია
- [ ] გამოტოვებული ველიდან სწორ ნაბიჯზე დაბრუნება
- [ ] unknown time-ით დასრულება
- [ ] განმეორებითი submit
- [ ] query cache ახლდება და Home იხსნება

კოდი: `frontend/src/modules/onboarding/steps/FinishStep.tsx`, `frontend/src/modules/onboarding/BirthDataOnboardingPage.tsx`, `backend/app/profiles/router.py`
შემდეგ: HOME
სამუშაო დავალება: JST-MAP-FINISH

### RESUME · შეწყვეტილი რეგისტრაციის გაგრძელება

გზა: /onboarding → /onboarding/birth-data
ტიპი: state

**არსებული:** შენახული პროფილი/birth-data/ინტერესები იტვირთება; დაკარგული აუცილებელი მონაცემი ადრინდელ ნაბიჯზე აბრუნებს.

**სამიზნე / გადასაწყვეტი:** არც ჩიხი და არც დაკარგული ინფორმაცია refresh/logout/login-ის შემდეგ.

- [ ] გაჩერება თითოეულ 8 ნაბიჯზე და დაბრუნება
- [ ] მე-6 ეტაპის სამივე ქვესაფეხურის აღდგენის ქცევა
- [ ] ნელი ქსელი და retry
- [ ] დასრულებული მომხმარებელი onboarding-ზე აღარ რჩება

კოდი: `frontend/src/modules/onboarding/BirthDataOnboardingPage.tsx`, `frontend/src/modules/onboarding/steps/ProfileEnrichmentModule.tsx`, `frontend/src/navigation/ProtectedRoute.tsx`
შემდეგ: IDENTITY, INTERESTS, HOME
სამუშაო დავალება: JST-MAP-RESUME

## Home

### HOME · Home · ძირითადი იერარქია

გზა: /
ტიპი: route

**არსებული:** ოთხი მთავარი ბლოკი: დღის ენერგია, Do/Don't, პირადი შრეები, ახალი ადამიანები.

**სამიზნე / გადასაწყვეტი:** თვითშეცნობა წინ; სხვა ადამიანებისკენ გასაგები შემდეგი ნაბიჯი; დიზაინი დამტკიცდეს რეალურ მდგომარეობებზე.

- [ ] ახალი და დაბრუნებული მომხმარებელი
- [ ] თითოეული ბლოკის დამოუკიდებელი შეცდომა
- [ ] მონაცემების გარეშე მდგომარეობა
- [ ] მობილურის ზომები და ქართული ტექსტი

კოდი: `frontend/src/modules/home/HomePage.tsx`
შემდეგ: DAILY, GUIDANCE, INSIGHTS, NEWPEOPLE
სამუშაო დავალება: JST-MAP-HOME

### DAILY · დღის ენერგიის ბარათი

გზა: / · დღის ტაბი
ტიპი: component

**არსებული:** თარიღი, archetype, ინტერპრეტაცია/განმარტება; ტექსტის clipboard კოპირება არსებობს.

**სამიზნე / გადასაწყვეტი:** დამტკიცებული ბრენდული ტექსტი, ბარათის გაზიარება და საკუთარ თავზე Jester-ისთვის კითხვის CTA.

**დასაზუსტებელი:** clipboard კოპირება არ უდრის დასრულებულ share flow-ს; AI CTA ჯერ ინტეგრირებული არაა.

- [ ] დღის შეცვლა timezone-ით
- [ ] real_transit და fallback გასაგებად განსხვავდება
- [ ] კოპირების უფლების უარყოფა
- [ ] გაზიარებაში მხოლოდ ნებადართული ტექსტი
- [ ] AI CTA არ გამოგონებს მონაცემებს

კოდი: `frontend/src/modules/home/HomeDailyEnergy.tsx`, `backend/app/interpretation/router.py`
შემდეგ: SHARE, AI, WEEKLY
სამუშაო დავალება: JST-MAP-DAILY

### WEEKLY · კვირის ენერგია

გზა: / · კვირის ტაბი
ტიპი: component

**არსებული:** ცალკე weekly query, preview/unlocked მდგომარეობები და Stars-ით გახსნა.

**სამიზნე / გადასაწყვეტი:** გაშვებისას ხილვადობის/ჩაკეტვის პოლიტიკა Founder-თან შესათანხმებელია; გადახდის დაპირება არ გავაკეთოთ.

**დასაზუსტებელი:** არსებული Stars განბლოკვა და ახალი launch მონეტიზაციის გადაწყვეტილება შესათანხმებელია.

- [ ] სწორი კვირის საზღვარი
- [ ] ჩაკეტილი preview და გახსნილი კონტენტი
- [ ] არასაკმარისი Stars
- [ ] ორმაგი click არ ჩამოჭრის ორჯერ
- [ ] წინა კვირის entitlement ქცევა

კოდი: `frontend/src/modules/home/HomeDailyEnergy.tsx`, `backend/app/interpretation/weekly_energy.py`, `backend/app/wallet/service.py`
შემდეგ: WALLET
სამუშაო დავალება: JST-MAP-WEEKLY

### GUIDANCE · გააკეთე / მოერიდე

გზა: / · Do / Don't
ტიპი: component

**არსებული:** დღის API-ის do/dont მიკროტეგები.

**სამიზნე / გადასაწყვეტი:** კონკრეტული მოკლე ხმა და გამართული empty/error მდგომარეობები.

- [ ] მოსალოდნელი რაოდენობა
- [ ] დაკლებული მონაცემი
- [ ] გრძელი ქართული ტექსტი
- [ ] დღის ბარათთან თანხვედრა

კოდი: `frontend/src/modules/home/HomeDoDont.tsx`, `backend/app/interpretation/data/daily_energy_tags.json`
შემდეგ: INSIGHTS
სამუშაო დავალება: JST-MAP-GUIDANCE

### INSIGHTS · გაიცანი საკუთარი თავი · პირადი შრეები

გზა: / · პირადი კატალოგი
ტიპი: component

**არსებული:** შვიდშრიანი კატალოგის UI, გახსნილი/ჩაკეტილი შრეები, unlock და ShareCardModal.

**სამიზნე / გადასაწყვეტი:** არსებული სემანტიკა შენარჩუნდეს; ტექსტები ხელახლა შეფასდეს; launch ხელმისაწვდომობა შეთანხმდეს.

- [ ] შრის გახსნა/დახურვა
- [ ] unknown birth time-ით სწორი შიგთავსი
- [ ] unlock შეცდომა
- [ ] განახლებული საფულე
- [ ] სწორი ბარათის გაზიარება

კოდი: `frontend/src/modules/home/HomePersonalInsights.tsx`, `backend/app/interpretation/personal_catalog.py`
შემდეგ: SHARE, ME, WALLET
სამუშაო დავალება: JST-MAP-INSIGHTS

### NEWPEOPLE · ახალი ადამიანები

გზა: / · ახალი ადამიანები
ტიპი: component

**არსებული:** Home ითხოვს newest რიგით 6 ადამიანს.

**სამიზნე / გადასაწყვეტი:** Home-დან Discovery-სა და პროფილზე ბუნებრივი გადასვლა; შემთხვევითი score არ გამოჩნდეს.

- [ ] ცარიელი სია
- [ ] ბლოკისა და ხილვადობის გაფილტვრა
- [ ] სურათის fallback
- [ ] პროფილზე გადასვლა
- [ ] კანდიდატების თანმიმდევრობა

კოდი: `frontend/src/modules/home/HomeNewPeople.tsx`, `backend/app/discovery/router.py`
შემდეგ: DISCOVER, PERSON
სამუშაო დავალება: JST-MAP-NEWPEOPLE

### SHARE · გაზიარების ბარათი და მეგობრის მოწვევა

გზა: Home overlay / share action
ტიპი: overlay

**არსებული:** პირადი insights-ის ShareCardModal და clipboard ნაკადები არსებობს.

**სამიზნე / გადასაწყვეტი:** Founder-ის მოთხოვნილი დღის ბარათის გაზიარების გამოცდილება; მიმღებს ჰქონდეს რეალური რეგისტრაციის შესასვლელი.

**პირადი მონაცემების საზღვარი:** ნებაყოფლობითი გაზიარება არ ნიშნავს მთლიან პროფილზე ან ჩატზე საჯარო წვდომას.

- [ ] ქართული შრიფტი ექსპორტზე
- [ ] სურათის/ტექსტის სწორი preview
- [ ] share cancel არ ითვლება წარმატებად
- [ ] URL არ შეიცავს პირად birth-data-ს
- [ ] მიმღები ხედავს მხოლოდ განზრახ გაზიარებულ შიგთავსს

კოდი: `frontend/src/modules/home/ShareCardModal.tsx`, `frontend/src/platform/share.ts`
შემდეგ: ENTRY
სამუშაო დავალება: JST-MAP-SHARE

## აღმოჩენა

### DISCOVER · Discover · ფილტრები და სია

გზა: /discover
ტიპი: route

**არსებული:** სახელის ძიება, ქალაქი, საერთო ინტერესები, swipe/list ხედები და pagination.

**სამიზნე / გადასაწყვეტი:** დამტკიცებული bounded discovery; ranking-ის ახალი პოლიტიკა არ მოვიგონოთ.

**დასაზუსტებელი:** newest pagination-ის cursor/order თანხვედრა რეგრესიის კანდიდატია; Home ამჟამად პირველ გვერდს ითხოვს.

- [ ] ფილტრების გასუფთავება
- [ ] ცარიელი და ბოლო გვერდი
- [ ] შემდეგი გვერდის retry
- [ ] პროფილიდან დაბრუნება ინარჩუნებს კონტექსტს
- [ ] არ ჩანს self/blocked/hidden/underage

კოდი: `frontend/src/modules/discover/DiscoverPage.tsx`, `backend/app/discovery/router.py`
შემდეგ: DECK, PERSON
სამუშაო დავალება: JST-MAP-DISCOVER

### DECK · ადამიანის ბარათი და დაკავშირების დადასტურება

გზა: /discover · card
ტიპი: component

**არსებული:** მარცხნივ Next; მარჯვნივ კავშირის დადასტურება; ფოტოს ცვლა ცალკეა.

**სამიზნე / გადასაწყვეტი:** შეცდომით swipe არ აგზავნის კავშირს; მომხმარებელს აქვს ღილაკები და კლავიატურა.

- [ ] scroll და drag არ ერევა
- [ ] ფოტოს tap არ ცვლის კანდიდატს
- [ ] cancel არაფერს აგზავნის
- [ ] explicit send ქმნის ერთ მოთხოვნას
- [ ] pending/accepted მდგომარეობები
- [ ] reduced motion და keyboard

კოდი: `frontend/src/modules/discover/DiscoverSwipeCard.tsx`, `frontend/src/modules/people/ConnectionActions.tsx`
შემდეგ: PERSON, CONNECTIONS
სამუშაო დავალება: JST-MAP-DECK

## პროფილები

### PERSON · სხვა ადამიანის პროფილი

გზა: /people/:id
ტიპი: route

**არსებული:** პროფილი, ფოტოები, ინტერესები, safe astrology და კავშირის მდგომარეობა.

**სამიზნე / გადასაწყვეტი:** ადამიანი და სოციალური ინფორმაცია პირველად; ნებადართული ინტერპრეტაცია შემდეგ.

**პირადი მონაცემების საზღვარი:** საჯარო ასაკი არ ნიშნავს დაბადების თარიღის/დროის/ადგილის გამჟღავნებას.

- [ ] არასწორი UUID
- [ ] self პროფილი
- [ ] blocked/hidden privacy-safe პასუხი
- [ ] ფოტო/ინტერესების ცალკე ჩავარდნა
- [ ] Discovery-ზე დაბრუნება
- [ ] ნედლი დაბადების ინფორმაცია არ ჩანს

კოდი: `frontend/src/modules/people/PersonProfilePage.tsx`, `backend/app/profiles/router.py`, `backend/app/profiles/photos.py`
შემდეგ: CONNECTIONS, WHY, COMPARE
სამუშაო დავალება: JST-MAP-PERSON

### ME · ჩემი პროფილი და თვითშეცნობა

გზა: /me
ტიპი: route

**არსებული:** safe astro, natal ინტერპრეტაციები, პროფილის რედაქტირება, recalculation და სოციალური იდენტობა.

**სამიზნე / გადასაწყვეტი:** სახელის/ბიოს/ქალაქის შეცვლა, პირადი ინფორმაციის მკაფიო გამიჯვნა და გამართული თვითშეცნობა.

- [ ] თავდაპირველი ჩატვირთვა
- [ ] რედაქტირება და გაუქმება
- [ ] განახლებული cache
- [ ] recalculation-ის შეცდომა
- [ ] unknown time მდგომარეობა
- [ ] გრძელი ტექსტები

კოდი: `frontend/src/modules/me/MePage.tsx`, `backend/app/profiles/router.py`, `backend/app/astrology/router.py`
შემდეგ: GALLERY, VISIBILITY, HOME
სამუშაო დავალება: JST-MAP-ME

### GALLERY · ფოტოგალერეა და სოციალური იდენტობის რედაქტირება

გზა: /me · სოციალური პროფილი
ტიპი: component

**არსებული:** ფოტოები/ინტერესების მართვის კომპონენტები და backend gallery lifecycle.

**სამიზნე / გადასაწყვეტი:** ატვირთვა/მთავარი ფოტო/თანმიმდევრობა სწორად ჩანდეს ყველა ზედაპირზე.

- [ ] ფოტოს reorder და primary
- [ ] 6 ფოტოს ლიმიტი
- [ ] დიდი/არასწორი ფაილი
- [ ] ქსელის წყვეტა
- [ ] owner-only ცვლილებები
- [ ] სურათის წაშლის სცენარი მხოლოდ ცალკე ნებადართულ test გარემოში

კოდი: `frontend/src/modules/people/SocialIdentity.tsx`, `backend/app/profiles/photos.py`, `docs/SOCIAL_PROFILE_MEDIA.md`
შემდეგ: ME, PERSON
სამუშაო დავალება: JST-MAP-GALLERY

### VISIBILITY · ხილვადობა და პირადი საზღვრები

გზა: /me · ხილვადობა
ტიპი: component

**არსებული:** პროფილის discoverable კონტროლი; enrichment-ის ხილვადობის მოდელი არსებობს.

**სამიზნე / გადასაწყვეტი:** UI, API, ფოტოები, ინტერესები და შედარება ერთნაირად იცავენ წესს.

- [ ] ხილვადობის გამორთვა სხვა სესიაში
- [ ] ძველი URL და cache
- [ ] პირადი მედიის პირდაპირი URL
- [ ] ბლოკი ორივე მიმართულებით
- [ ] logout-ზე cache reset

კოდი: `frontend/src/modules/me/MePage.tsx`, `backend/app/profiles/photos.py`, `backend/app/enrichment/router.py`
შემდეგ: ME, CONNECTIONS
სამუშაო დავალება: JST-MAP-VISIBILITY

## ურთიერთობები

### CONNECTIONS · კავშირების მართვა

გზა: /connections
ტიპი: route

**არსებული:** მიღებული, შემოსული, გაგზავნილი, დაბლოკილი tabs; accept/decline/cancel/remove/block/unblock.

**სამიზნე / გადასაწყვეტი:** კანონიკური წყვილი, გასაგები მდგომარეობები და ორმხრივი თანხმობა.

- [ ] ორმაგი მოთხოვნა
- [ ] შემოსულის მიღება/უარყოფა
- [ ] გაგზავნილის გაუქმება
- [ ] remove/block კეტავს chat-ს
- [ ] unblock ავტომატურად არ აღადგენს accepted-ს
- [ ] პარალელური მოქმედებები

კოდი: `frontend/src/modules/connections/ConnectionsPage.tsx`, `backend/app/connections/router.py`
შემდეგ: MESSAGES, CHAT, WHY, COMPARE
სამუშაო დავალება: JST-MAP-CONNECTIONS

### WHY · რატომ ვეწყობით / ურთიერთობის ახსნა

გზა: /people/:id/why
ტიპი: route

**არსებული:** კავშირის მიხედვით სრული Why ან დაშვებული preview; starters და საუბარში გადასვლა.

**სამიზნე / გადასაწყვეტი:** ქულა და ინტერპრეტაცია განსხვავდება; სრული შედეგი მხოლოდ უფლებამოსილ გზაზე.

**პირადი მონაცემების საზღვარი:** exact astronomy და evidence-ის კერძო ველები არ გაჟონოს.

- [ ] stranger/pending/accepted/blocked ოთხივე მდგომარეობა
- [ ] სრული API ავტორიზაცია
- [ ] missing birth data
- [ ] არაიდენტური ურთიერთობის intent-ის ტექსტები
- [ ] starter composer-შია და არ იგზავნება ავტომატურად

კოდი: `frontend/src/modules/compatibility/WhyPage.tsx`, `backend/app/comparisons/router.py`, `backend/app/interpretation/router.py`
შემდეგ: CHAT, CONNECTIONS
სამუშაო დავალება: JST-MAP-WHY

### COMPARE · ორი ადამიანის შედარება

გზა: /compare/:id
ტიპი: route

**არსებული:** ორი პროფილი, accepted შედარება ან preview, კავშირის მოქმედებები.

**სამიზნე / გადასაწყვეტი:** არსებული versioned score უცვლელია; შეცდომები და უფლებები თანმიმდევრულია.

- [ ] საკუთარ თავთან შედარება
- [ ] invalid/hidden target
- [ ] accepted და preview განსხვავება
- [ ] კავშირის ცვლილების შემდეგ cache
- [ ] compare/why შორის თანმიმდევრობა

კოდი: `frontend/src/modules/compatibility/ComparePage.tsx`, `backend/app/comparisons/router.py`
შემდეგ: WHY, CHAT, CONNECTIONS
სამუშაო დავალება: JST-MAP-COMPARE

## მიმოწერა

### MESSAGES · შეტყობინებების სია

გზა: /messages
ტიპი: route

**არსებული:** ნებადართული საუბრები, ბოლო შეტყობინება, unread და აქტივობით დალაგება.

**სამიზნე / გადასაწყვეტი:** ორი რეალური ნებადართული test-ანგარიშით end-to-end inbox.

- [ ] ცარიელი inbox
- [ ] ახალი შეტყობინება ცვლის რიგს
- [ ] unread და გახსნილი chat
- [ ] block/remove-ის შემდეგ გაქრობა
- [ ] reconnect და tab resume

კოდი: `frontend/src/modules/messages/MessagesPage.tsx`, `backend/app/conversations/router.py`, `frontend/src/core/realtime/SocialSync.tsx`
შემდეგ: CHAT
სამუშაო დავალება: JST-MAP-MESSAGES

### CHAT · ადამიანებს შორის ჩატი

გზა: /chat/:conversation_id
ტიპი: route

**არსებული:** ისტორია, ძველი გვერდები, plain text composer, nonce/retry, პირადი read state.

**სამიზნე / გადასაწყვეტი:** ადამიანების ჩატი დამოუკიდებელია JesterAI-ისგან; მობილურის კლავიატურა და კავშირის წესები მუშაობს.

**პირადი მონაცემების საზღვარი:** ჩატის ტექსტი არ მიდის analytics/session replay-ში.

- [ ] გაგზავნა და დაბრუნებული პასუხი
- [ ] ქსელის შეცდომაზე retry არ დუბლირდება
- [ ] ძველი ისტორიის scroll
- [ ] ფონში მიღებული შეტყობინება არ ითვლება წაკითხულად
- [ ] block/send race
- [ ] iOS/Android keyboard

კოდი: `frontend/src/modules/chat/ChatPage.tsx`, `backend/app/conversations/router.py`, `docs/MESSAGING_WAVE4.md`
შემდეგ: MESSAGES, WHY
სამუშაო დავალება: JST-MAP-CHAT

## სხვა გვერდები

### NOTIFICATIONS · შეტყობინებების ცენტრი

გზა: /notifications
ტიპი: route

**არსებული:** შეტყობინებების სია, წაკითხულად მონიშვნა და ტიპის მიხედვით გადასვლა; connection event producers არსებობს.

**სამიზნე / გადასაწყვეტი:** რეალურად წარმოებული notification ტიპები სწორ მისამართზე მიდის.

**დასაზუსტებელი:** ტიპის renderer არ ამტკიცებს, რომ ყველა მოვლენის producer/push სისტემა არსებობს.

- [ ] შემოსული მოთხოვნა იხსნება შესაბამის tab-ზე
- [ ] accept მოვლენის ბმული
- [ ] mark read და badge თანხვედრა
- [ ] ცარიელი/შეცდომა
- [ ] logout/login არ აჩვენებს წინა ანგარიშის badge-ს

კოდი: `frontend/src/modules/notifications/NotificationsPage.tsx`, `frontend/src/shared/AppShell.tsx`, `backend/app/connections/router.py`
შემდეგ: CONNECTIONS, CHAT, COMPARE
სამუშაო დავალება: JST-MAP-NOTIFICATIONS

### WALLET · Stars-ის საფულე

გზა: Home navigation · modal
ტიპი: overlay

**არსებული:** ბალანსი, ტრანზაქციები, ფასები და unlock; ფულის მიღება არ არის.

**სამიზნე / გადასაწყვეტი:** Founder-მა განსაზღვროს launch-ზე ჩვენება/შეზღუდვა/Coming soon; ახალი ფულის წესი არ მოვიგონოთ.

**დასაზუსტებელი:** მონეტიზაციის launch პოლიტიკა გადაწყვეტას საჭიროებს.

- [ ] ნულოვანი ბალანსი
- [ ] სერვერული ტარიფები
- [ ] double unlock და retry
- [ ] შეცდომა არ უნდა გამოჩნდეს როგორც რეალური ნული
- [ ] თავისუფალი/ჩაკეტილი ფუნქციები თანხვდება გადაწყვეტილებას

კოდი: `frontend/src/modules/wallet/WalletModal.tsx`, `frontend/src/modules/wallet/useWallet.ts`, `backend/app/wallet/service.py`
შემდეგ: WEEKLY, INSIGHTS
სამუშაო დავალება: JST-MAP-WALLET

### LOGOUT · გამოსვლა და სესიის შეცვლა

გზა: /logout
ტიპი: route

**არსებული:** signOut, login redirect, retry; /auth/logout alias.

**სამიზნე / გადასაწყვეტი:** მომხმარებლის private cache და subscription-ები აღარ რჩება.

- [ ] signOut წარმატება/შეცდომა
- [ ] უკან ღილაკი აღარ ხსნის პირად მონაცემებს
- [ ] სხვა ანგარიშით შესვლა
- [ ] realtime subscriptions cleanup

კოდი: `frontend/src/navigation/AppRoutes.tsx`, `frontend/src/core/auth/context.tsx`, `frontend/src/core/realtime/SocialSync.tsx`
შემდეგ: LOGIN
სამუშაო დავალება: JST-MAP-LOGOUT

## JesterAI

### AI · კითხე Jester-ს საკუთარ თავზე

გზა: მთავარ აპში route ჯერ დასადგენია
ტიპი: planned

**არსებული:** ცალკე JesterAI პროტოტიპი არსებობს; მთავარ router-ში ინტეგრირებული გვერდი არ არის.

**სამიზნე / გადასაწყვეტი:** ტექსტური აუდიენცია პროფილის/დღის ნებადართული კონტექსტით; 3 კითხვა და შემდეგ 5 საჩუქარი.

**დასაზუსტებელი:** UI route, ისტორიის მუდმივი შენახვა და მთავარი პლატფორმის ინტეგრაცია გასაკეთებელია.

- [ ] ვინაობა JWT-დან
- [ ] სხვისი საუბრის აკრძალვა
- [ ] კონტექსტის allowlist
- [ ] პროვაიდერის timeout და retry
- [ ] საჩუქარი ერთხელ და restart-ზე უცვლელი
- [ ] სარკაზმი დამცირების გარეშე

კოდი: `frontend/src/navigation/AppRoutes.tsx`, `docs/JESTER_AI_CONTEXT_SYSTEM_V1_SPEC.md`
შემდეგ: AI-GIFT, HOME
სამუშაო დავალება: JST-MAP-AI

### AI-GIFT · სამი კითხვის შემდეგ ხუთი საჩუქარი

გზა: JesterAI · quota state
ტიპი: planned

**არსებული:** მთავარ პროდუქტში ჯერ არ არის ინტეგრირებული.

**სამიზნე / გადასაწყვეტი:** მესამე წარმატებული პასუხის შემდეგ ბრენდული საჩუქრის ტექსტი; კიდევ 5 კითხვა; შემდეგ გამჭვირვალე ლიმიტი.

- [ ] შეკითხვა ითვლება შეთანხმებული წარმატების წესით
- [ ] ერთდროული მოთხოვნები
- [ ] წარუმატებელ პასუხზე აღდგენა
- [ ] საჩუქარი არ მეორდება
- [ ] დღის ინტერპრეტაცია არ ამტკიცებს რეალურად მომხდარ ამბავს
- [ ] ლიმიტის შემდეგ ყალბი checkout არ არის

კოდი: `docs/AI.md`, `docs/launch/2026-11-14-launch-planning-baseline.md`
შემდეგ: AI
სამუშაო დავალება: JST-MAP-AI-GIFT

## გაშვების საერთო შემოწმება

### SHELL · ნავიგაცია, deep links და aliases

გზა: ყველა ძირითადი გვერდი
ტიპი: state

**არსებული:** desktop/mobile shell და legacy redirects არსებობს; wildcard root-ზე გადადის.

**სამიზნე / გადასაწყვეტი:** მომხმარებელმა იცოდეს სადაა; უსაფრთხო უკან დაბრუნება და უცნობი URL-ის შეთანხმებული ქცევა.

- [ ] ხუთი ძირითადი დანიშნულება
- [ ] მობილურის safe-area
- [ ] deep link ახალ სესიაში
- [ ] ყველა legacy alias
- [ ] unknown route
- [ ] drawer/modal focus და Escape

კოდი: `frontend/src/shared/AppShell.tsx`, `frontend/src/modules/home/HomeNavigation.tsx`, `frontend/src/navigation/AppRoutes.tsx`
შემდეგ: HOME, DISCOVER, ME, MESSAGES, CONNECTIONS
სამუშაო დავალება: JST-MAP-SHELL

### SUPPORT · მხარდაჭერა, საჩივარი და ანგარიშის მოთხოვნები

გზა: route ჯერ დასადგენია
ტიპი: planned

**არსებული:** ამ მარშრუტების სრული პროდუქტის გზა router-ში არ მოიძებნა.

**სამიზნე / გადასაწყვეტი:** Founder-ის მხარდაჭერასთან მისასვლელი გზა; მოდერაციის და ანგარიშის მოთხოვნების დამტკიცებული პროცესი.

**დასაზუსტებელი:** support/moderation/account-deletion flow უნდა შეთანხმდეს და განხორციელდეს.

- [ ] დახმარების მიღება დაბლოკილი/ვერშესული მომხმარებლისთვის
- [ ] საჩივრის მიღება და შემდგომი პასუხი
- [ ] ანგარიშის მოთხოვნის ვინაობის შემოწმება
- [ ] რეალური ჩანაწერების წაშლის გარეშე რეპეტიცია

კოდი: `frontend/src/navigation/AppRoutes.tsx`, `docs/SECURITY.md`
შემდეგ: LOGIN
სამუშაო დავალება: JST-MAP-SUPPORT

### INTERNAL · შიდა სატესტო გვერდების იზოლაცია

გზა: /visual-lab · /__lab · /__debug/backend-audit · /smoke-test · /content-inspector
ტიპი: internal

**არსებული:** სატესტო მარშრუტები router-ში უპირობოდაა რეგისტრირებული.

**სამიზნე / გადასაწყვეტი:** production მომხმარებლისთვის შიდა ლაბორატორიები მიუწვდომელია; backend-იც იცავს საზღვრებს.

- [ ] ყველა debug alias production build-ზე
- [ ] ანონიმური და შესული მომხმარებელი
- [ ] private endpoint სერვერული guard
- [ ] შიდა ბმულები აღარ ჩანს navigation-ში

კოდი: `frontend/src/navigation/AppRoutes.tsx`, `backend/app/astrology/debug.py`
შემდეგ: HOME
სამუშაო დავალება: JST-MAP-INTERNAL

### ANALYTICS · სრული გზის ანალიტიკა

გზა: ყველა დამტკიცებული ნაბიჯი
ტიპი: planned

**არსებული:** მოქმედ SDK კონფიგურაციას ეს ინვენტარი არ ადასტურებს.

**სამიზნე / გადასაწყვეტი:** acquisition → signup → onboarding → first insight → დაბრუნება; გაზიარება და 3+5 ჩატი.

- [ ] არც birth-data, არც ჩატის ტექსტი payload-ში
- [ ] მოვლენა არ დუბლირდება retry-ზე
- [ ] გაზიარების click განსხვავდება completion-ისგან
- [ ] Clarity გამორიცხავს მგრძნობიარე გვერდებს
- [ ] თანხმობის ქცევა გადამოწმებულია

კოდი: `frontend/src/core/`, `docs/launch/2026-11-14-launch-planning-baseline.md`
შემდეგ: ENTRY
სამუშაო დავალება: JST-MAP-ANALYTICS

