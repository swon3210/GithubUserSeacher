## 미리보기

![맘시터 과제](https://user-images.githubusercontent.com/32982670/143724834-9d6eadfc-780f-414d-b4d6-95f2cb84eb15.gif)
<br />
<br />

## 배포 링크

url : https://angry-roentgen-e46fe9.netlify.app/
<br />

github : https://github.com/swon3210/GithubUserSeacher
<br />
<br />

## 기능명세

- Github 사용자 검색 및 표시
- 즐겨찾기한 사용자를 브라우저 로컬 저장소에 저장
- 즐겨찾기한 사용자를 브라우저 로컬 저장소에서 검색 및 표시
<br />
<br />


## 상세 기능 명세

### Github 사용자 검색 화면

- [x] 검색어 입력창에 검색어를 입력하고, 검색 버튼을 클릭하면 Github 사용자 검색
- [x] 검색 결과를 출력
  - 검색 결과는 최대 100개까지.
  - 사용자가 이미 즐겨찾기에 추가되어 있으면 이를 표시
  - 사용자 이름 첫 글자를 헤더로 설정
  - 사용자 이름 순으로 정렬 (순서: 한글 -> 영어 -> 기타 -> 유니코드)
- [x] 각 사용자의 아이템 뷰를 누르면 즐겨찾기 추가/취소
  - 즐겨찾기 검색 화면에서도 해당 사용자를 추가/삭제

### 즐겨찾기 검색 화면

- [x] 검색어 입력창에 검색어를 입력하고 검색 버튼을 클릭하면, 로컬 저장소에서 이름에 검색어가 포함된 사용자를 검색
  - 검색 필드는 사용자 이름으로 제한
- [x] 검색어와 매칭된 모든 사용자 리스트를 출력
  - Github 사용자 검색화면과 조건 동일
  - 사용자 이름 첫 글자를 헤더로 설정
  - 사용자 이름 순으로 정렬 (순서: 한글 -> 영어 -> 기타 -> 유니코드)
- [x] 각 사용자의 아이템 뷰를 누르면 즐겨찾기를 취소 & 리스트에서 삭제
  - Github 사용자 검색 화면에서도 해당 사용자의 아이템 뷰를 갱신
<br />
<br />

### 빌드 방법

```bash
yarn build
```
<br />
<br />

### 개발서버 구동 방법

```bash
yarn start
```
<br />
<br />


### 구조도

![image](https://user-images.githubusercontent.com/32982670/143724709-a005457e-9dd3-4851-b225-c912693e007b.png)

**Component** : 별도의 상태를 유지하지 않고 받은 매개변수에 따라 HTMLElement 를 리턴하는 함수입니다.
<br />
**Container** : 주요 비즈니스 로직들을 메서드에 담고 Stateless Component 를 조립하고 상태를 내려주는 클래스입니다.
<br />
**Layout** : 페이지 라우팅과 상관없이 유지되는 컴포넌트입니다. Container 와 동일하게 class 이며 상태와 비즈니스 로직을 가질 수 있습니다.
<br />
**Page** : 주요 비즈니스 로직들을 담은 Container 들을 조립하고 서버와 통신하여 받은 데이터를 Container 들에게 내려주는 역할을 하는 최상위 컴포넌트입니다.
<br />
<br />


### 문제해결 과정

1. 제시된 과제 판단 기준 중 '재사용 및 확장 가능한 애플리케이션 구조 설계'에 가장 큰 초점을 두고 작업을 진행하기로 결정했습니다. 따라서 난잡해질 수 있는 자바스크립트, css 코드를 최대한 역할을 분리시키고 같은 역할로 묶이는 코드들을 응집시키기 위해 무엇을 할 수 있을지 고민했습니다.
<br />

2. 리액트와 비슷하게 로직을 '컴포넌트' 단위로 쪼개자는 아이디어를 얻었습니다. 그리고 여기서 'presentational & container' 컴포넌트 구성 방식을 보고 이것이 자바스크립트에도 적용될 수 있는 범용적인 디자인 패턴이라고 생각했습니다. stateless 컴포넌트 함수와 stateful 클래스를 각각 고안해낼 수 있었습니다.
<br />

3. component를 생성할 때 일정한 형식을 자연스럽게 강제할 수 있는 방법이 필요했습니다. 조금이라도 형식이 다른 컴포넌트들이 한데 얽히면 앱의 안정성을 보장할 수 없으리라 생각했기 때문입니다. 모든 컴포넌트들이 createComponent 함수를 통해 생성되도록 하였습니다. 해당 함수를 두번째 인자로 함수를 받는 고차함수로 설정하여 HTMLElement 를 구성하는데 들이는 비용을 줄였습니다. 이것으로 저 외에 다른 개발자들이 컴포넌트를 생성할 때 이 함수를 사용하도록 자연스럽게 유도되도록 편의성을 제공한 것입니다.
<br />

4. 다른 기능들은 구현하는데 별 어려움이 없었지만 검색한 유저를 저장하고 탭을 바꿀 때마다 다른 데이터를 보여주는 부분에서 막히게 되었습니다. 최대한 상태와 컴포넌트를 많이 만드는 것을 지양하고자 했기에 유저 검색 결과와 즐겨찾기된 유저 목록 모두 하나의 배열을 바탕으로 기능을 구현해보려고 노력했습니다. 그러나 자꾸만 예외 케이스가 발생하자. 검색된 유저 목록과 즐겨찾기로 저장된 유저 목록은 그 동작과 성질이 많이 다르다는 것을 알게 되었습니다. 조회 목록은 메모리 상의 상태와 연결되고 클릭해도 화면상에서 사라지면 안되며 검색을 수행할 시에 완전히 다른 데이터들을 가져와 새로 렌더링해야하는 반면, 저장 목록은 브라우저 로컬 스토리지 상태와 연결되고 클릭할 시에 화면상에서 사라져야 하며 검색을 수행해도 다른 데이터를 가져오는 것이 아니라 기존 데이터에서 필터링을 수행해야 하는 것이었습니다.
<br />

5. 결국 검색 결과 목록 & 즐겨찾기 목록 기능을 구현하기 위해 원래 하나였던 Container 컴포넌트를 둘로 나누었습니다. 신경써야 하는 시나리오의 경우의 수를 줄여서 예외 케이스들을 모두 처리하는데 성공했습니다.
<br />

6. 그 외에 수행한 일은 다음과 같습니다.
- sass(scss)의 도입, mixin을 최대한 활용하여 css 코드 모듈화
- 리액트와 같은 컴포넌트 기반 어플리케이션 구현
- 타입스크립트의 적용과 제네릭 활용
- Component 와 Container 모두 prop 으로 className 을 내려줌으로써 상위 컴포넌트에서 하위 컴포넌트의 스타일 제어 권한 부여. (각 역할에 맞는 css 코드들을 분리)

<br />
<br />

### 배운점

시각적으로는 비슷해 보이는 기능들이라도 여러 경우의 수를 나누어 별도로 처리해야 하는 경우가 있다는 것을 알게 되었습니다. 또한 생각보다 상태를 변경할 일이 많아서 옵저버 패턴을 도입해볼걸 하는 아쉬움이 남았습니다. 코드들 중엔 명령형으로 작성된 부분들도 있어서 아쉬움이 또 남습니다. 초반에 시간을 너무 많이 쓴탓에 허겁지겁 구현하느라 그런 탓도 있지만 컴포넌트 구조를 떠올리고 나서 비즈니스 로직에 관해서 크게 고민해보지 않았다는 것이 제가 이번에 가장 크게 반성하고 이로부터 배워야 할 부분이라고 생각합니다. 좋은 배움의 기회 주신 것에 감사드립니다.
<br />


