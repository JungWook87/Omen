package com.ln.intranet.common.model.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

		
		@ExceptionHandler(value = {Exception.class})
	    @RequestMapping(path = "/errors", method = RequestMethod.GET)
	    public String renderErrorPage(HttpServletRequest req, RedirectAttributes ra
	    		) {
			
			log.info("GlobalExcptionHandler 실행중");
			
	        String referer = req.getHeader("Referer");
	        
	        String message = null;
	        
	        Integer statusCode = (Integer) req.getAttribute("javax.servlet.error.status_code");
	        
	        if (referer != null && !referer.isEmpty()) {
	        	
	            switch (statusCode) {
	            case 400: {
	            	message = "Http Error Code: 400. Bad Request";
	                ra.addFlashAttribute("message", message);
	                break;
	            }
	            case 401: {
	               message  = "Http Error Code: 401. Unauthorized";
	               ra.addFlashAttribute("message", message);
	                break;
	            }
	            case 404: {
	            	message = "Http Error Code: 404. Resource not found";
	            	ra.addFlashAttribute("message", message);
	                break;
	            }
	            case 500: {
	            	message = "Http Error Code: 500. Internal Server Error";
	            	ra.addFlashAttribute("message", message);
	                break;
	            }
	        }
	            return "redirect:" + referer;
	            
	        } else {
	        	
	            return "redirect:/";  
	        }

	     
	    }
	    
	  
    
}
