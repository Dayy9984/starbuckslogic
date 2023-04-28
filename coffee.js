function passing(s){
    var st = [];
    var stack = [];
    var menuprevious = false;
    var notprevious = false;
    for(var i = 0; i < s.length; i++){
        if (s[i] == '∨'){
            if (notprevious){
                notprevious = false;
                continue;
            }
            st.push(stack.pop());
            menuprevious = false;
        }    
        else if (s[i] == '∧'){
            menuprevious = true;
            notprevious = false;
            continue;
        }
        else if (s[i] == '~'){
            notprevious = true;
            continue;
        }
        else{
            if (menuprevious && !notprevious){
                temp = stack.pop();
                temp += s[i];
                stack.push(temp);
            }
            else if (notprevious){
                continue;
            }
            else{
                stack.push(s[i]);
                menuprevious = true;
            }
        }
    }
    st.push(stack.pop())
    return st
}
function cases(st){
    var s = [];
    for(var i = 1; i<st.length+1; i++){
        var temp = [];
        temp = permutation(st,i);
        console.log(temp);
        for(var j = 0; j < st.length; j++){
            var tmp = swap(temp[j]);
            if (!s.includes(tmp)){
                s.push(tmp);}
        }
    }
    return s.sort((x,y)=>x.length-y.length);
}
function swap(st){
    a = [];
    for(var i = 0; i < st.length; i++){
        if (st[i] == 'C'){
            a.unshift(st[i]);
        }
        else if (st[i] == 'M'){
            a.push(st[i]);
        }
        else{a.push(st[i]);}
    }
    tmp = a.join("");
    console.log(1,tmp);
    return tmp;
}

function compare(a,b){
    result = ""
    if (a==b){
        result = "YES";}
    var l=a[0].length;
    for(var i = 0; i<a.length; i++){
        var cnt = 0;
        tmp = a[i];
        if (l == tmp.length){
            cnt+=1;}
        if (cnt > 1){
            result = "NO";}
    }
    if (a[0] == b[b.length-1]){
        result = "YES";}
    else{
        result = "NO";}
    if (result == "NO"){
        for(var i = 0; i<b.length; i++){
            if (a[i] != b[i]){
                return result;
            }
        }
        result = "YES";
        return result;
    }
    else{
        return result;
    }       
}

function permutation(arr, num){
    const res = [];
    if(num === 1) return arr.map((v) => [v]);
  
    arr.forEach((v, idx, arr) => {
      const rest = [...arr.slice(0,idx), ...arr.slice(idx+1)];
      const permutations = permutation(rest, num-1);
      const attach = permutations.map((permutation) => [v, ...permutation]);
      res.push(...attach);
    })
    return res;
  }


var selectedInput = null;
document.getElementById("input1").addEventListener("focus", function () {
    selectedInput = document.getElementById("input1");
});
document.getElementById("input2").addEventListener("focus", function () {
    selectedInput = document.getElementById("input2");
});

document.getElementById("delete").addEventListener("click", function () {
    if (selectedInput !== null && selectedInput.value.length > 0) {
        selectedInput.value = selectedInput.value.slice(0, -1);
    }
});

function insertText(text) {
    if (selectedInput !== null) {
        selectedInput.value += text;
    }
}

document.getElementById("C").addEventListener("click", function () {
    insertText("C");
});

document.getElementById("M").addEventListener("click", function () {
    insertText("M");
});

document.getElementById("and").addEventListener("click", function () {
    insertText("∧");
});

document.getElementById("or").addEventListener("click", function () {
    insertText("∨");
});

document.getElementById("not").addEventListener("click", function () {
    insertText("~");
});
document.getElementById("resetBtn").addEventListener("click", function () {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("resultText").innerText = "";
});
document.getElementById("compareBtn").addEventListener("click", function () {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var st1 = passing(input1);
    var st2 = passing(input2);
    var cases1 = cases(st1);
    var cases2 = cases(st2);
    console.log(cases1);
    console.log(cases2);
    var result = compare(cases1, cases2);
    if (selectedInput !== null) {
        document.getElementById("resultText").innerText = result;
    }
    
});

