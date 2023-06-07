<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/notice/notice.css">
  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
  <!-- jquery cdn -->
  <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
    crossorigin="anonymous"></script>

  <title>ê³µì§ì¬í­</title>
</head>

<body>

 <jsp:include page="/WEB-INF/views/common/header.jsp"/>
  <section>

    <!-- ì¬ì´ë ë° -->
    <div class="side-bar menu">
      <!-- íì´ì§ë§ë¤ ë°ëë ì ëª© -->
      <h1>ê³µì§ì¬í­</h1>

      <!-- íì´ì§ë§ë¤ ë°ëë ë¶ì ëª© -->
      <ul>
        <li><a href=""><span>ê³µì§ì¬í­</span> </a></li>

      </ul>
    </div>

    <!-- ì»¨íì¸  ë´ì© -->
    <div class="content-all-page">

      <!-- ì»¨íì¸  ë´ì© ìë¶ë¶ -->
      <div class="content-all-top-area">

        <div class="content-all-top-area-detail">

          <!-- ì»¨íì¸  ì ëª© ë¶ë¶ -->
          <div>
            <p class="content-all-top-text1">ê³µì§ì¬í­ / </p>
            <p class="content-all-top-text2">ê³µì§ì¬í­</p>
          </div>

          <!-- ì¤ë¥¸ìª½ ë²í¼ ë¶ë¶ -->

          <!-- ê³µì§ì¬í­ ëª¨ë¬ì°½ -->
          <div>
            <button type="button" class="omen-btn" id="popupBtn">ê³µì§ì¬í­ ì¶ê°</button>
          </div>

          <div id="modalWrap">
            <div class="modalBody">
              <span id="closeBtn">
                <img src="../images/Xbtn.png" alt="">
              </span>
              <h1>ê³µì§ì¬í­</h1>
              <!-- ì 1 -->
              <div class="modal-line"></div>

              <!-- <form action="#" method="post" enctype="multipart/form-data"> -->
              <!-- ì ëª© -->
              <div class="modal-title">
                <p>ì ëª©</p>
                <input type="text" placeholder="ì ëª©ì ìë ¥í´ì£¼ì¸ì" required>
              </div>
              <!-- ë´ì© -->
              <div class="modal-detail">
                <p>ë´ì©</p>
                <textarea name="" id="" onkeydown="handleResizeHeight(this)"
                  onkeyup="handleResizeHeight(this)"></textarea>
              </div>
              <!-- íì¼ ìë¡ë -->
              <div class="file-box">
                <button type="button" id="file-remove">íì¼ ì§ì°ê¸°</button>
                <label for="file-uploads">íì¼ ì¬ë¦¬ê¸°</label>
                <input type="file" id="file-uploads" name="file-uploads" accept="" multiple>
              </div>
              <!-- ì íë íì¼ -->
              <div class="preview"></div>
              <!-- ì 2 -->
              <div class="modal-line"></div>
              <!-- ë²í¼ -->
              <div class="notice-submit-reset-btns">
                <button type="reset" id="cancell-btn">ì·¨ì</button>
                <button id="success-btn">íì¸</button>
              </div>
              <!-- </form> -->
            </div>
          </div>

        </div>




      </div>

      <!-- ì»¨íì¸  ë´ì© ìë«ë¶ë¶ -->
      <div class="content-all-bottom-area">
        <div class="notice-table">
          <table>

            <thead>
              <tr>
                <th>ë²í¸</th>
                <th>ì ëª©</th>
                <th>ìì±ì¼</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>ê³µì§ì¬í­ìëë¤</td>
                <td>2023ë 6ì 4ì¼(ì¼)</td>
              </tr>

           
            </tbody>
          </table>
        </div>
      </div>

      <!-- ì¬ì©ìê° ìì±í ê³µì§ì¬í­ ì´ê¸° -->
      <div id="check-modalWrap">
        <div class="check-modalBody">
          <span id="check-closeBtn">
            <img src="../images/Xbtn.png" alt="">
          </span>
          <h1>ê³µì§ì¬í­</h1>
          <!-- ì 1 -->
          <div class="modal-line"></div>

          <!-- ì ëª© -->
          <div class="check-modal-title">
            <p>ì ëª©</p>
            <input type="text" readonly>
          </div>
          <!-- ë´ì© -->
          <div>
            <p>ë´ì©</p>
            <div class="check-modal-detail"></div>
          </div>

          <!-- ì íë íì¼ -->
          <p>ì²¨ë¶íì¼</p>
          <div class="check-preview"></div>
          <!-- ì 2 -->
          <div class="modal-line"></div>
          <!-- ë²í¼ -->
          <div class="notice-submit-reset-btns">
            <button id="check-remove-btn">ì­ì </button>
            <button type="reset" id="check-cancell-btn">ë«ê¸°</button>
            <button id="check-success-btn">ìì </button>
          </div>

        </div>
      </div>

    </div>

    <!-- ì±íì°½ -->
    <div id="chatting-function" class="chatting-box">
      <a href="#">
        <img class="chatting-img" src="../images/chattImg.png" alt="">
      </a>
    </div>
  </section>


  <script src="${contextPath}/resources/js/notice/notice.js"></script>
</body>

</html>