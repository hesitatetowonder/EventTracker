package controllers;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;


import data.EventTrackerDAOImpl;
import entities.Sleep;

@RestController
public class EventTrackerContoller {
	

	@Autowired
	EventTrackerDAOImpl eventDAO;

	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}


	@RequestMapping(path = "sleep", method = RequestMethod.GET)
	public List<Sleep> index() {
		return eventDAO.index();
	}


	@RequestMapping(path = "sleep/{id}", method = RequestMethod.GET)
	public Sleep show(@PathVariable int id) {
		return eventDAO.show(id);
	}


	@RequestMapping(path = "sleep", method = RequestMethod.POST)
	public Sleep create(@RequestBody String jsonSleeps, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Sleep mappedSleep = mapper.readValue(jsonSleeps, Sleep.class);
			res.setStatus(201);
			return eventDAO.create(mappedSleep);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}


//	@RequestMapping(path = "sleep/{id}", method = RequestMethod.PUT)
//	public Sleep update(@PathVariable int id, @RequestBody String quizJSON, HttpServletResponse res) {
//		ObjectMapper mapper = new ObjectMapper();
//		try {
//			Sleep mappedSleep = mapper.readValue(quizJSON, Quiz.class);
//			res.setStatus(202);
//			return eventDAO.update(id, mappedSleep);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}
//
//	@RequestMapping(path = "sleep/{id}", method = RequestMethod.DELETE)
//	public boolean destroy(@PathVariable int id) {
//		try {
//			eventDAO.destroy(id);
//			return true;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//	}

}





