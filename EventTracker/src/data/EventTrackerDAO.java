package data;

import java.util.List;

import entities.Sleep;

public interface EventTrackerDAO {
	
	public List<Sleep> index();
	public Sleep show(int id);
	public Sleep create(Sleep sleep);
	public Sleep update(int id, Sleep sleep);
	public boolean destroy(int id);

}
