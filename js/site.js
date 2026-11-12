(function(){
  var burger=document.getElementById('burger'),nav=document.getElementById('nav');
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded',open?'true':'false');
  });
  nav.addEventListener('click',function(e){if(e.target.tagName==='A')nav.classList.remove('open')});

  if(document.getElementById('estimate')){
  var RATE={
    stone:[240,420,'Stone slate'], slate:[145,230,'Natural slate'], plain:[120,190,'Plain tile'],
    inter:[90,145,'Interlocking tile'], grp:[120,175,'GRP fibreglass'], epdm:[100,155,'EPDM rubber'],
    lead:[275,460,'Code 4/5 lead'], felt:[75,120,'Torch-on felt']
  };
  var FLAT={grp:1,epdm:1,lead:1,felt:1};
  var EX={
    scaf:[1000,2400,'Scaffold, hire and edge protection'],
    chim:[770,1550,'Chimney stack re-lead'],
    velux:[2000,3500,'2 x Velux, supplied and flashed in'],
    ins:[770,1650,'Loft insulation upgrade']
  };
  var len=document.getElementById('len'),wid=document.getElementById('wid'),
      pitch=document.getElementById('pitch'),pv=document.getElementById('pv'),
      calc=document.getElementById('calc'),lo=document.getElementById('lo'),
      lines=document.getElementById('lines'),pf=document.getElementById('pitch-fld');

  function money(n){return '\u00a3'+Math.round(n/100)*100/1 .toLocaleString('en-GB');}
  function gbp(n){return '\u00a3'+(Math.round(n/100)*100).toLocaleString('en-GB');}

  function calcIt(){
    var L=parseFloat(len.value)||8.5, W=parseFloat(wid.value)||8;
    L=Math.min(Math.max(L,2),60); W=Math.min(Math.max(W,2),30);
    var cov=document.querySelector('input[name=cov]:checked').value;
    var flat=!!FLAT[cov];
    pf.style.display=flat?'none':'';
    var deg=parseInt(pitch.value,10); pv.innerHTML=deg+'&deg;';
    var foot=L*W;
    var factor=flat?1:1/Math.cos(deg*Math.PI/180);
    var area=foot*factor;
    var r=RATE[cov];
    var a=area*r[0], b=area*r[1];
    var rows=[[r[2]+', stripped and re-laid ('+area.toFixed(0)+' m\u00b2)',a,b]];
    var checks=[].slice.call(document.querySelectorAll('#o-ex input:checked'));
    checks.forEach(function(c){
      if(c.value==='line'){
        var per=2*(L+W); var x=per*66,y=per*110;
        rows.push(['Fascia, soffit and guttering ('+per.toFixed(0)+' m)',x,y]); a+=x; b+=y; return;
      }
      var e=EX[c.value]; if(!e)return;
      rows.push([e[2],e[0],e[1]]); a+=e[0]; b+=e[1];
    });
    var vat=1.2;
    calc.innerHTML= flat
      ? foot.toFixed(0)+' m\u00b2 footprint, laid flat \u2192 <b style="color:var(--grit-2)">'+area.toFixed(0)+' m\u00b2</b> of covering.'
      : L+' m \u00d7 '+W+' m = '+foot.toFixed(0)+' m\u00b2 footprint. At '+deg+'\u00b0 the pitch factor is \u00d7'+factor.toFixed(3)+', so the true roof area is <b style="color:var(--grit-2)">'+area.toFixed(0)+' m\u00b2</b>.';
    lo.textContent=gbp(a*vat)+' \u2013 '+gbp(b*vat);
    lines.innerHTML=rows.map(function(x){
      return '<div class="line"><span>'+x[0]+'</span><b>'+gbp(x[1]*vat)+' \u2013 '+gbp(x[2]*vat)+'</b></div>';
    }).join('');
  }

  document.querySelectorAll('#o-prop input').forEach(function(i){
    i.addEventListener('change',function(){
      var d=i.value.split(','); len.value=d[0]; wid.value=d[1]; calcIt();
    });
  });
  ['change','input'].forEach(function(ev){
    document.getElementById('estimate').addEventListener(ev,calcIt);
  });
  calcIt();

  }

  if(document.getElementById('enq')){
  document.getElementById('enq').addEventListener('submit',function(e){
    e.preventDefault();
    var form=this, s=document.getElementById('sent'), btn=form.querySelector('button[type=submit]');
    btn.disabled=true; btn.textContent='Sending...';
    var done=function(msg){ s.hidden=false; s.innerHTML=msg;
      btn.disabled=false; btn.textContent='Send enquiry';
      s.scrollIntoView({behavior:'smooth',block:'center'}); };
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},
               body:new URLSearchParams(new FormData(form)).toString()})
      .then(function(r){
        if(!r.ok) throw new Error(r.status);
        form.reset();
        done('<b>Thanks \u2014 that is with us.</b> We will come back to you as soon as we can. If it is urgent, ring the office on 01298 298928.');
      })
      .catch(function(){
        done('<b>Preview mode.</b> On the live site this posts straight through to the office. Ring 01298 298928 in the meantime.');
      });
  });
  }
})();
