package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.Sleep;

public class EventTrackerDAOImpl implements EventTrackerDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Sleep> index() {
		String query = "Select s from Sleep s";
		List <Sleep> sleepy = em.createQuery(query, Sleep.class).getResultList();
		return sleepy;
		}
	
	@Override
	public Sleep show(int id) {
		return em.find(Sleep.class, id);
	}
	
	@Override
	public Sleep create(Sleep sleep) {
		em.persist(sleep);
		em.flush();
		return sleep;
	}
	
	@Override
	public Sleep update(int id, Sleep sleep) {
		Sleep managed = em.find(Sleep.class, id);
		
		em.persist(managed);
		em.flush();
		
		return managed;
	}


	
}


