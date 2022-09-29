(()=>{var v="dual-listbox",b="dual-listbox__container",p="dual-listbox__available",E="dual-listbox__selected",r="dual-listbox__title",c="dual-listbox__item",m="dual-listbox__buttons",f="dual-listbox__button",u="dual-listbox__search",n="dual-listbox__item--selected",_="up",L="down",d=class{constructor(t,e={}){this.setDefaults(),this.selected=[],this.available=[],this.dragged=null,d.isDomElement(t)?this.select=t:this.select=document.querySelector(t),this._initOptions(e),this._initReusableElements(),e.options!==void 0?this._splitOptions(e.options):this._splitOptions(this.select.options),this._buildDualListbox(this.select.parentNode),this._addActions(),this.sortable&&this._initializeSortButtons(),this.redraw()}setDefaults(){this.addEvent=null,this.removeEvent=null,this.availableTitle="Available options",this.selectedTitle="Selected options",this.showAddButton=!0,this.addButtonText="add",this.showRemoveButton=!0,this.removeButtonText="remove",this.showAddAllButton=!0,this.addAllButtonText="add all",this.showRemoveAllButton=!0,this.removeAllButtonText="remove all",this.searchPlaceholder="Search",this.sortable=!1,this.upButtonText="up",this.downButtonText="down",this.draggable=!1}addEventListener(t,e){this.dualListbox.addEventListener(t,e)}addSelected(t,e){let s=this.available.indexOf(t);s>-1&&(this.available.splice(s,1),this.selected.push(t),this._selectOption(t.dataset.id),!e&&this.redraw(),setTimeout(()=>{let i=document.createEvent("HTMLEvents");i.initEvent("added",!1,!0),i.addedElement=t,this.dualListbox.dispatchEvent(i)},0))}redraw(){this.updateAvailableListbox(),this.updateSelectedListbox()}removeSelected(t,e){let s=this.selected.indexOf(t);s>-1&&(this.selected.splice(s,1),this.available.push(t),this._deselectOption(t.dataset.id),!e&&this.redraw(),setTimeout(()=>{let i=document.createEvent("HTMLEvents");i.initEvent("removed",!1,!0),i.removedElement=t,this.dualListbox.dispatchEvent(i)},0))}searchLists(t,e){let s=e.querySelectorAll(`.${c}`),i=t.toLowerCase();for(let l=0;l<s.length;l++){let a=s[l];a.textContent.toLowerCase().indexOf(i)===-1?a.style.display="none":a.style.display="list-item"}}updateAvailableListbox(){this._updateListbox(this.availableList,this.available)}updateSelectedListbox(){this._updateListbox(this.selectedList,this.selected)}_actionAllSelected(t){t.preventDefault(),this.available.filter(s=>s.style.display!=="none").forEach(s=>this.addSelected(s,!0)),setTimeout(()=>{this.redraw()},1)}_updateListbox(t,e){for(;t.firstChild;)t.removeChild(t.firstChild);for(let s=0;s<e.length;s++){let i=e[s];t.appendChild(i)}}_actionItemSelected(t){t.preventDefault();let e=this.dualListbox.querySelector(`.${n}`);e&&this.addSelected(e,!1)}_actionAllDeselected(t){t.preventDefault(),this.selected.filter(s=>s.style.display!=="none").forEach(s=>this.removeSelected(s,!0)),setTimeout(()=>{this.redraw()},1)}_actionItemDeselected(t){t.preventDefault();let e=this.dualListbox.querySelector(`.${n}`);e&&this.removeSelected(e,!1)}_actionItemDoubleClick(t,e=null){e&&(e.preventDefault(),e.stopPropagation()),this.selected.indexOf(t)>-1?this.removeSelected(t,!1):this.addSelected(t,!1)}_actionItemClick(t,e,s=null){s&&s.preventDefault();let i=e.querySelectorAll(`.${c}`);for(let l=0;l<i.length;l++){let a=i[l];a!==t&&a.classList.remove(n)}t.classList.contains(n)?t.classList.remove(n):t.classList.add(n)}_addActions(){this._addButtonActions(),this._addSearchActions()}_addButtonActions(){this.add_all_button.addEventListener("click",t=>this._actionAllSelected(t)),this.add_button.addEventListener("click",t=>this._actionItemSelected(t)),this.remove_button.addEventListener("click",t=>this._actionItemDeselected(t)),this.remove_all_button.addEventListener("click",t=>this._actionAllDeselected(t))}_addClickActions(t){return t.addEventListener("dblclick",e=>this._actionItemDoubleClick(t,e)),t.addEventListener("click",e=>this._actionItemClick(t,this.dualListbox,e)),t}_addSearchActions(){this.search_left.addEventListener("change",t=>this.searchLists(t.target.value,this.availableList)),this.search_left.addEventListener("keyup",t=>this.searchLists(t.target.value,this.availableList)),this.search_right.addEventListener("change",t=>this.searchLists(t.target.value,this.selectedList)),this.search_right.addEventListener("keyup",t=>this.searchLists(t.target.value,this.selectedList))}_buildDualListbox(t){this.select.style.display="none",this.dualListBoxContainer.appendChild(this._createList(this.search_left,this.availableListTitle,this.availableList)),this.dualListBoxContainer.appendChild(this.buttons),this.dualListBoxContainer.appendChild(this._createList(this.search_right,this.selectedListTitle,this.selectedList)),this.dualListbox.appendChild(this.dualListBoxContainer),t.insertBefore(this.dualListbox,this.select)}_createList(t,e,s){let i=document.createElement("div");return i.appendChild(t),i.appendChild(e),i.appendChild(s),i}_createButtons(){this.buttons=document.createElement("div"),this.buttons.classList.add(m),this.add_all_button=document.createElement("button"),this.add_all_button.innerHTML=this.addAllButtonText,this.add_button=document.createElement("button"),this.add_button.innerHTML=this.addButtonText,this.remove_button=document.createElement("button"),this.remove_button.innerHTML=this.removeButtonText,this.remove_all_button=document.createElement("button"),this.remove_all_button.innerHTML=this.removeAllButtonText;let t={showAddAllButton:this.add_all_button,showAddButton:this.add_button,showRemoveButton:this.remove_button,showRemoveAllButton:this.remove_all_button};for(let e in t)if(e){let s=this[e],i=t[e];i.setAttribute("type","button"),i.classList.add(f),s&&this.buttons.appendChild(i)}}_createListItem(t){let e=document.createElement("li");return e.classList.add(c),e.innerHTML=t.text,e.dataset.id=t.value,this._addClickActions(e),this.draggable&&e.setAttribute("draggable","true"),e}_createSearchLeft(){this.search_left=document.createElement("input"),this.search_left.classList.add(u),this.search_left.placeholder=this.searchPlaceholder}_createSearchRight(){this.search_right=document.createElement("input"),this.search_right.classList.add(u),this.search_right.placeholder=this.searchPlaceholder}_deselectOption(t){let e=this.select.options;for(let s=0;s<e.length;s++){let i=e[s];i.value===t&&(i.selected=!1,i.removeAttribute("selected"))}this.removeEvent&&this.removeEvent(t)}_createDragListeners(){let t=e=>{e.addEventListener("dragstart",s=>{this.dragged=s.currentTarget,s.currentTarget.classList.add("dragging")}),e.addEventListener("dragend",s=>{s.currentTarget.classList.remove("dragging")})};[...this.selectedList.children].forEach(t),[...this.availableList.children].forEach(t),[this.availableList,this.selectedList].forEach(e=>{e.addEventListener("dragover",s=>{s.preventDefault()},!1),e.addEventListener("dragenter",s=>{s.target.classList.add("dropping")}),e.addEventListener("dragleave",s=>{s.target.classList.remove("dropping")}),e.addEventListener("drop",s=>{s.preventDefault(),s.target.classList.remove("dropping"),(e.classList.contains("dual-listbox__selected")||e.classList.contains("dual-listbox__available"))&&(e.classList.contains("dual-listbox__selected")?this.addSelected(this.dragged):this.removeSelected(this.dragged))})})}_initOptions(t){for(let e in t)t.hasOwnProperty(e)&&(this[e]=t[e])}_initReusableElements(){this.dualListbox=document.createElement("div"),this.dualListbox.classList.add(v),this.select.id&&this.dualListbox.classList.add(this.select.id),this.dualListBoxContainer=document.createElement("div"),this.dualListBoxContainer.classList.add(b),this.availableList=document.createElement("ul"),this.availableList.classList.add(p),this.selectedList=document.createElement("ul"),this.selectedList.classList.add(E),this.availableListTitle=document.createElement("div"),this.availableListTitle.classList.add(r),this.availableListTitle.innerText=this.availableTitle,this.selectedListTitle=document.createElement("div"),this.selectedListTitle.classList.add(r),this.selectedListTitle.innerText=this.selectedTitle,this._createButtons(),this._createSearchLeft(),this._createSearchRight(),this.draggable&&setTimeout(()=>{this._createDragListeners()},10)}_selectOption(t){let e=this.select.options;for(let s=0;s<e.length;s++){let i=e[s];i.value===t&&(i.selected=!0,i.setAttribute("selected",""))}this.addEvent&&this.addEvent(t)}_splitOptions(t){for(let e=0;e<t.length;e++){let s=t[e];d.isDomElement(s)?this._addOption({text:s.innerHTML,value:s.value,selected:s.attributes.selected}):this._addOption(s)}}_addOption(t){let e=this._createListItem(t);t.selected?this.selected.push(e):this.available.push(e)}_initializeSortButtons(){let t=document.createElement("button");t.classList.add("dual-listbox__button"),t.innerText=this.upButtonText,t.addEventListener("click",i=>this._onSortButtonClick(i,_));let e=document.createElement("button");e.classList.add("dual-listbox__button"),e.innerText=this.downButtonText,e.addEventListener("click",i=>this._onSortButtonClick(i,L));let s=document.createElement("div");s.classList.add("dual-listbox__buttons"),s.appendChild(t),s.appendChild(e),this.dualListBoxContainer.appendChild(s)}_onSortButtonClick(t,e){t.preventDefault();let[s,i]=this._findSelected(e);s!==i&&(this._sortUnderlyingSelectOptions(s,i),this._sortSelected(s,i),this.redraw())}_findSelected(t){let e=this.selected.findIndex(i=>i.classList.contains("dual-listbox__item--selected")),s=e;return _===t&&e>0?s-=1:L===t&&e<this.selected.length-1&&(s+=1),[e,s]}_sortUnderlyingSelectOptions(t,e){let s=this.selected[t].getAttribute("data-id"),i=this.selected[e].getAttribute("data-id"),l=[...this.select.children].findIndex(o=>o.value===s),a=[...this.select.children].findIndex(o=>o.value===i),h=this.select.children[l];h.remove(),this.select.insertBefore(h,this.select.children[a])}_sortSelected(t,e){let s=this.selected[t];this.selected.splice(t,1),this.selected.splice(e,0,s)}static isDomElement(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"}};window.DualListbox=d;var x=d;})();
//# sourceMappingURL=dual-listbox.js.map
