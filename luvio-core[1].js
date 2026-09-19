const LH={
 key:"luvioHealthLinkDB_v2_clean",
 session:"luvioHealthLinkSession_v2_clean",
 seed(){
  if(localStorage.getItem(this.key))return;
  this.save({patients:[],doctors:[{id:"DOC-001",name:"Dr. A. Sharma",specialty:"General Medicine",clinic:"Luvio Polyclinic"}],pharmacies:[{id:"PH-001",name:"Luvio Pharmacy"}],labs:[{id:"LAB-001",name:"Luvio Diagnostics"}],hospitals:[{id:"HOS-001",name:"Partner Hospital"}]});
 },
 get(){this.seed();return JSON.parse(localStorage.getItem(this.key))},
 save(db){localStorage.setItem(this.key,JSON.stringify(db))},
 findPatient(id){return this.get().patients.find(p=>p.id===id)},
 findByMobile(m){return this.get().patients.find(p=>p.mobile===m)},
 nextId(){return "LH-"+String(this.get().patients.length+1).padStart(6,"0")},
 savePatient(p){const db=this.get(),i=db.patients.findIndex(x=>x.id===p.id);if(i>=0)db.patients[i]=p;else db.patients.push(p);this.save(db)},
 login(id){localStorage.setItem(this.session,id)},logout(){localStorage.removeItem(this.session)},
 current(){const id=localStorage.getItem(this.session);return id?this.findPatient(id):null},
 update(id,fn){const p=this.findPatient(id);if(!p)return null;fn(p);this.savePatient(p);return p}
};
LH.seed();
