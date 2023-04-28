import itertools

def passing(s):
    st = []
    stack = []
    menuprevious = False
    notprevious = False
    for ch in s:
        if ch == '∨':
            if notprevious:
                notprevious = False
                continue
            st.append(stack.pop())
            menuprevious = False
            
        elif ch == '∧':
            menuprevious = True
            notprevious = False
            continue
        elif ch == '~':
            notprevious = True
            continue
        else:
            if menuprevious and (not notprevious):
                temp = stack.pop()
                temp += ch
                stack.append(temp)
            elif notprevious:
                continue
            else:
                stack.append(ch)
                menuprevious = True
            
    st.append(stack[-1])
    return st

def case(st):
    s = []
    for i in range(1,len(st)+1):
        temp = list(map(''.join, itertools.permutations(st,i)))
        for ch in temp:
            tmp = swap(ch)
            if tmp not in s:
                s.append(tmp)
    s.sort(key=len)
    return s

def swap(st):
    a = []
    for ch in st:
        if ch == 'C':
            a.insert(0, ch)
        elif ch == 'M':
            a.append(ch)
    tmp = ''.join(a)
    return tmp

def compare(a,b):
    result = ""
    if a==b:
        result = "YES"
    l=len(a[0])
    for st in a:
        cnt = 0
        if l == len(st):
            cnt+=1
        if cnt > 1:
            result = "NO"
    if a[0] == b[-1]:
        result = "YES"
    else:
        result = "NO"
    if result == "NO":
        for i in range(len(b)):
            if a[i] != b[i]:
                return result
        result = "YES"
        return result
    else:
        return result
    
print("점원의 조건식:",end ="")
staff = input()
p_staff = case(passing(staff))
print("주문 조건식:",end="")
order = input()
p_order = case(passing(order))
print("점원의 경우의 수:",p_staff)
print("주문의 경우의 수:",p_order)
print(compare(p_staff,p_order))