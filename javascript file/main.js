(function(){
    let btn = document.querySelector("#firstbutton");
    // btn.style.align = 'center';
    
    let divcontainer = document.querySelector("#container");
    let myTemplates = document.querySelector('#myTemplates');
    let fid = 0;
    let folders = [];// making array of folders

    btn.addEventListener('click', function(){
        let fname = prompt("Enter the folder's name");
        if(!fname){
            return;
        }
        let divfoldertemplate = myTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divfoldertemplate, true);
        
        let divname = divFolder.querySelector("[purpose='name']");
        divname.innerHTML = fname;
        
        divFolder.setAttribute('fid', ++fid);
        let spandelete =  divFolder.querySelector("span[action='Delete']");
        spandelete.addEventListener('click', ()=> {
            let flag = confirm("Are you sure to delete " + divname.innerHTML +" folder");// here confirm is use for Yes/No response. and alert() use to give an information before some wrong happens.
            if(flag == true){
            divcontainer.removeChild(divFolder);
            let idx = folders.findIndex(f=> f.id == Number(divFolder.getAttribute("fid")));// we can also use parseInt() instead Number() both work in the same way, thier work is to convert string value to number/integer value.
            folders.splice(idx,1);
            persistFolders();            
            };
        });

        let spanEdit =  divFolder.querySelector("span[action='edit']");
        spanEdit.addEventListener('click', ()=>{
            let fname = prompt("Give the name of new folder");// here prompt() use to take some input from the users.
            if(!fname){
             return;
            };
            divname.innerHTML = fname;
            let folder = folders.find(f=>f.id == Number(divFolder.getAttribute("fid")));
            folder.name = fname;
            persistFolders();

        });
        

        divcontainer.appendChild(divFolder);// here appendChild() function is used to add child element like divFolder to divcontainer
        folders.push({
            id: fid,
            name: fname
        });
        persistFolders();

    });
   

    function persistFolders(){
        console.log(folders);
        let fjson = JSON.stringify(folders);// here JSON() creates object of passed value (i.e, folders);
        localStorage.setItem("data", fjson);// here, localStorage() store these data into localStorage.
    };
    

})();